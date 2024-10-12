import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { CartService } from './cart.service';
import { Response } from 'express';
import { ApiResponse } from 'src/global/interfaces/api.interfaces';
import { Cart } from '@prisma/client';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async create(
    @Res() response: Response
  ): Promise<Response> {
    const cart = await this.cartService.create()
    return response.status(200).json({
      data: cart as Cart,
      message: []
    } as ApiResponse<Cart>) 
  }

  @Get()
  async findAll(
    @Res() response: Response
  ): Promise<Response> {
    const carts = await this.cartService.findAll()
    return response.status(200).json({
      data: carts,
      message: []
    } as ApiResponse<Cart>);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(id);
  }
}
