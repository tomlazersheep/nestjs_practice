import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {} 
  // this makes available all methods from AuthService class, 
  // while keeping the business logic out of the controller 

  //endpoint for login
  @Post('sign_in')
  sign_in(@Body(new ValidationPipe( {
    whitelist: true, // discards any field not declared in DTO
  })) dto: AuthDto) {
    console.log({
      dto,
    }); 
    
    return this.authService.sign_in(dto); // using methods from the service class AuthService
  }

  //endpoint to register
  @Post('register')
  async register(@Body(new ValidationPipe({
    whitelist: true,
  })) dto: AuthDto) {
    const user = await this.authService.register(dto); 
    return user;
  }

}
 