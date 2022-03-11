import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

//Injectable decorator makes the service available to instantiate on the constructor in the controller file
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {} // this makes prisma methods available in this scope

  sign_in(dto: AuthDto) {
    return { msg:'im signed in frasdasdom a service :)' }
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
}
