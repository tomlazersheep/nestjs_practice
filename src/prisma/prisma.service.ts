import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// here is all logic that handles the connection with the database
@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: "file:./dev.db"
        }
      }
    });
  }
}
