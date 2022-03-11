import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  //this sets up a validation pipe to use validation methods in Dto definitions ( like @IsEmail() etc..)
  app.useGlobalPipes(new ValidationPipe()); 
  
  await app.listen(3000);
}
bootstrap();
