
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Response } from 'express';
import { ApiResponse } from 'src/global/interfaces/api.interfaces';
import { Product } from '@prisma/client';
import { ProductParamsDto } from './dto/product-params.dto';
import { DEFAULT_SERVER_ERROR_RESPONSE } from 'src/constants/api.constants';
import { ControllerUtils } from 'src/global/utils/controller.util';

@Controller('products')
export class ProductsController extends ControllerUtils {
  constructor(private readonly productsService: ProductsService) { super() }

  @Post()
  async create(
    @Res() response: Response,
    @Body() createProductDto: CreateProductDto
  ): Promise<Response> {
    try {
      if(createProductDto.price_offer && createProductDto.price_offer > createProductDto.price) {
        return response.status(400).json({
          data: {},
          message: [{
            field: "price_offer",
            error: "The offer price can't be greater than the price"
          }]
        } as ApiResponse<Product>)
      }
      const newProduct = await this.productsService.create(createProductDto)

      if(!newProduct) {
        return response.status(404).json({
          data: {},
          message: [{
            field: "categoryId",
            error: "The category doesn't exists"
          }]
        } as ApiResponse<Product>)
      }
  
      return response.status(201).json({
        data: newProduct,
        message: []
      } as ApiResponse<Product>)
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .json(DEFAULT_SERVER_ERROR_RESPONSE as ApiResponse<Product>)
    }
  }

  @Get()
  async findAll(
    @Res() response: Response,
    @Query() params: ProductParamsDto
  ): Promise<Response> {
    try {
      const errors = await this.validateFilter(UpdateProductDto, params.filter)
      if(errors.message.length > 0) {
        return response.status(400).json(errors)
      }
      const { 
        data: products,
        meta 
      } = await this.productsService.findAll(params)
      return response.status(200).json({
        data: products,
        message: [],
        meta
      } as ApiResponse<Product>)
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .json(DEFAULT_SERVER_ERROR_RESPONSE as ApiResponse<Product>)
    }
  }

  @Get(':id')
  async findOne(
    @Res() response: Response,
    @Param('id') id: string
  ): Promise<Response | null> {
    const product = await this.productsService.findOne(id);
    return response.status(200).json({
      data: product,
      message: []
    } as ApiResponse<Product>)
  }

  @Patch(':id')
  async update(
    @Res() response: Response,
    @Param('id') id: string, 
    @Body() updateProductDto: UpdateProductDto
  ): Promise<Response> {
    const updatedProduct = await this.productsService.update(id, updateProductDto);
    if(updatedProduct === undefined) {
      return response.status(400).json({
        data: {},
        message: [{
          field: "price_offer",
          error: "The offer price must be lower than the price"
        }]
      } as ApiResponse<Product>)
    }

    if(!updatedProduct) {
      return response.status(404).json({
        data: {},
        message: [{
          field: "categoryId, product",
          error: "The category or the product doesn't exists"
        }]
      } as ApiResponse<Product>)
    }

    return response.status(200).json({
      data: updatedProduct,
      message: []
    } as ApiResponse<Product>)
  }

  @Delete(':id')
  async remove(
    @Res() response: Response,
    @Param('id') id: string
  ): Promise<Response> {
    await this.productsService.remove(id)
    return response.status(204).send();
  }
}
