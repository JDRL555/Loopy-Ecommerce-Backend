import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Color, Product, Size } from '@prisma/client';
import { ProductParamsDto } from './dto/product-params.dto';
import { ApiResponse } from 'src/global/interfaces/api.interfaces';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto): Promise<Product | null> {
    const category = await this.prisma.category.findFirst({
      where: { id: createProductDto.categoryId }
    })
    if(!category) {
      return null
    }
    return await this.prisma.product.create({ data: createProductDto })
  }

  async findAll(
    params: ProductParamsDto
  ): Promise<ApiResponse<Product[]>> {
    const page = params.page
    const perPage = params.limit
    const filter = params.filter

    if(filter.colors) {
      filter.colors = {
        hasSome: filter.colors as Color[]
      }
    }

    if(filter.sizes) {
      filter.sizes = {
        hasSome: filter.sizes as Size[]
      }
    }

    const total = await this.prisma.product.count({ where: filter })
    return {
      data: await this.prisma.product.findMany({
        skip: (page - 1) * perPage,
        take: perPage,
        where: filter,
        include: {
          category: true
        }
      }),
      message: [],
      meta: {
        total,
        page,
        lastPage: Math.ceil( total / perPage ),
        limit: perPage,
        filter
      }
    }
  }

  async findOne(id: string): Promise<Product | null> {
    return await this.prisma.product.findFirst({ where: { id } })
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product | null> {
    return await this.prisma.product.update({
      data: updateProductDto,
      where: { id }
    })
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.prisma.product.delete({
        where: { id }
      });
      return false
    } catch (error) {
      return true
    }
  }
}
