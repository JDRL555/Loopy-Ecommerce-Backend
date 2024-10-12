import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartService {
  
  constructor(private prisma: PrismaService) {}

  async create() {
    return await this.prisma.cart.create({ data: {} })
  }

  async findAll() {
    return await this.prisma.cart.findMany({ include: { items: true } });
  }

  async findOne(id: string) {
    return await this.prisma.cart.findFirst({
      where: { id },
      include: {
        items: true
      }
    })
  }

  async remove(id: string) {
    return await this.prisma.cart.delete({ where: { id } })
  }
}
