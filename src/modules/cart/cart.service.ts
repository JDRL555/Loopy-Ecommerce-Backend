import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartService {
  
  constructor(private prisma: PrismaService) {}

  async create(createCartDto: CreateCartDto) {
    const user = await this.prisma.user.findFirst({
      where: { id: createCartDto.userId }
    })
    if(!user) {
      return null
    }
    return await this.prisma.cart.create({ data: createCartDto })
  }

  async findAll() {
    return await this.prisma.cart.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
