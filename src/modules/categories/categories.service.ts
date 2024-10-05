import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Category } from '@prisma/client';
import { CategoryParamsDto } from './dto/category-params.dto';
import { ApiResponse } from 'src/global/interfaces/api.interfaces';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.prisma.category.create({ data: createCategoryDto })
  }

  async findAll(
    params: CategoryParamsDto
  ): Promise<ApiResponse<Category[]>> {
    const page = params.page
    const perPage = params.limit
    const filter = params.filter
    const total = await this.prisma.category.count({
      where: filter
    })
    return {
      data: await this.prisma.category.findMany({
        skip: (page - 1) * perPage,
        take: perPage,
        where: filter
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

  async findOne(id: string): Promise<Category | null> {
    return await this.prisma.category.findFirst({ where: { id } })
  }

  async findByName(name: string): Promise<Category | null> {
    return await this.prisma.category.findFirst({ where: { name } })
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category | null> {
    return await this.prisma.category.update({
      data: updateCategoryDto,
      where: { id }
    })
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.prisma.category.delete({
        where: { id }
      });
      return false
    } catch (error) {
      return true
    }
  }
}
