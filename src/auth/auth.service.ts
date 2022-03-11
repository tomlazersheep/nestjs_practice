import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';

//Injectable decorator makes the service available to instantiate on the constructor in the controller file
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  sign_in(dto: AuthDto) {
    return { msg:'im signed in frasdasdom a service :)' }
  }


  async register(dto: AuthDto) {
    const hash = await argon.hash(dto.password);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
      }
    })
    return user;
  }
}
