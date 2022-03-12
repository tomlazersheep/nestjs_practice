import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [PrismaModule, JwtModule.register({})], //here i can import MODULES 
  controllers: [AuthController], 
  providers: [AuthService, JwtStrategy]            //here i can import SERVICES (that's why jwtmodule is not here)
})
export class AuthModule {}
