import { Controller, Get, Param } from '@nestjs/common';

@Controller('products')
export class ProductsController {

  @Get()
  findAll(): string {
    return 'all products';
  }
  
  @Get(':id')
  findOne(@Param() params): string {
    return `this is product #${params.id}`;
  }

  
}
