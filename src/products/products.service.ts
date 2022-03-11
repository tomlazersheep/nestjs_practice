import { Injectable } from '@nestjs/common';
import { Product } from './interfaces/product.interfaces';

@Injectable()
export class ProductsService {

  create(product: Product): Product {
    return {
      name: 'pasta',
      price: 23,
      description: 'some pasta',
    } 
  }
}
