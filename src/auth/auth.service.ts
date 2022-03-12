import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

//Injectable decorator makes the service available to instantiate on the constructor in the controller file
@Injectable()
export class AuthService {
  constructor( // here i inject methods
    // this makes prisma methods available in this scope
    private prisma: PrismaService,
    
    //this makes jwt methods available here
    private jwt: JwtService, 
    // i can use this here because I imported JwtModule on 
    //auth.module.ts AND JwtModule exports this service
    private config: ConfigService,
    ) {} 

  async sign_in(dto: AuthDto) {
    //find user by email 
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    });
    if (!user) {
      throw new ForbiddenException('User does not exist');
    }
    const pwrdMatch = await argon.verify(user.hash, dto.password);
    if (!pwrdMatch) {
      throw new ForbiddenException('Password incorrect');
    }
    const token = await this.signToken(user.id, user.email);
    return token;
  }

  async register(dto: AuthDto) {
    const hash = await argon.hash(dto.password); // hash password with argon
    try {
      const user = await this.prisma.user.create({ // create a user instance with data
        data: {
          email: dto.email,
          hash,
        }
      });
      delete user.hash; //remove the hash field from the OBJECT, not from de database. 
      //This way you don't send a hashed password in the return
      return user;

    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError){
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already in use'); // throw a nestjs defined ForbiddenException
        } else {
          throw error;
        }
        // return error; // return the error with error code
      }
    }
  }

  async signToken(userId: number, userEmail: string): Promise<{access_token: string}> {
    const payload = {
      sub: userId,
      email: userEmail
    };
    const secret = this.config.get('JWT_SECRET'); 

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '150m',
      secret,
    });
    return {access_token: token};
  }
}
