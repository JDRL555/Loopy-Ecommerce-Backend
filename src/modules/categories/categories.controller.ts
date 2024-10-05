import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Response } from 'express';
import { ApiResponse } from 'src/global/interfaces/api.interfaces';
import { Category } from '@prisma/client';
import { CategoryParamsDto } from './dto/category-params.dto';
import { DEFAULT_SERVER_ERROR_RESPONSE } from 'src/constants/api.constants';
import { ControllerUtils } from 'src/global/utils/controller.util';

@Controller('categories')
export class CategoriesController extends ControllerUtils {
  constructor(private readonly categoriesService: CategoriesService) { super() }

  @Post()
  async create(
    @Res() response: Response,
    @Body() createCategoryDto: CreateCategoryDto
  ): Promise<Response> {
    try {
      
      const categoryFound = await this.categoriesService.findByName(createCategoryDto.name)
  
      if(categoryFound) {
        return response.status(400).json({
          data: {},
          message: [{
            field: "name",
            error: "The category already exists"
          }]
        } as ApiResponse<Category>)
      }
  
      const newCategory = await this.categoriesService.create(createCategoryDto)
  
      return response.status(201).json({
        data: newCategory,
        message: []
      } as ApiResponse<Category>)
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .json(DEFAULT_SERVER_ERROR_RESPONSE as ApiResponse<Category>)
    }
  }

  @Get()
  async findAll(
    @Res() response: Response,
    @Query() params: CategoryParamsDto
  ): Promise<Response> {
    try {
      const errors = await this.validateFilter(UpdateCategoryDto, params.filter)
      if(errors.message.length > 0) {
        return response.status(400).json(errors)
      }
      const { 
        data: categories,
        meta 
      } = await this.categoriesService.findAll(params)
      return response.status(200).json({
        data: categories,
        message: [],
        meta
      } as ApiResponse<Category>)
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .json(DEFAULT_SERVER_ERROR_RESPONSE as ApiResponse<Category>)
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
