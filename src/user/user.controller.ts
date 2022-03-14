import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  
  @UseGuards(AuthGuard('jwt')) // this key jwt is declared in strategy.ts:9
  @Get('me')
  myprofile() {
    return 'this is u';
  }
}
