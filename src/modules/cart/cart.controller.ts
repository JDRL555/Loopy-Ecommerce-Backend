import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Response } from 'express';
import { ApiResponse } from 'src/global/interfaces/api.interfaces';
import { Cart } from '@prisma/client';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async create(
    @Body() createCartDto: CreateCartDto,
    @Res() response: Response
  ): Promise<Response> {
    const cart = await this.cartService.create(createCartDto)
    if(!cart) {
      return response.status(404).json({
        data: {} as Cart,
        message: [{
          field: "user",
          error: "User not found"
        }]
      } as ApiResponse<Cart>)
    }
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(id);
  }
}
