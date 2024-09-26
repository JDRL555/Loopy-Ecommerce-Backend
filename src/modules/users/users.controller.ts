import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query, BadRequestException } from '@nestjs/common';
import { Response } from 'express';
import { genSalt, hash } from 'bcrypt'
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.model';
import { ApiResponse } from 'src/global/interfaces/api.interfaces'
import { DEFAULT_SERVER_ERROR_RESPONSE } from 'src/constants/api.constants';
import { UserParamsDto } from './dto/user-params.dto';
import { validateFilter } from 'src/global/utils/validate-filter.util';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Res() response: Response,
    @Body() createUserDto: CreateUserDto
  ): Promise<Response> {
    try {
      const salts = await genSalt()
      const password_hashed = await hash(createUserDto.password, salts)
      const newUser = await this.usersService.create({
        ...createUserDto,
        password: password_hashed
      });
      return response.status(201).json({
        data: newUser as User,
        message: []
      } as ApiResponse<User>)
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .json(DEFAULT_SERVER_ERROR_RESPONSE as ApiResponse<User>) as Response 
    }
    
  }

  @Get()
  async findAll(
    @Res() response: Response,
    @Query() params: UserParamsDto
  ): Promise<Response> {
    try {
      const errors = await validateFilter(UpdateUserDto, params.filter)
      if(errors.message.length > 0) {
        return response.status(400).json(errors)
      }
      const { 
        data: users,
        meta 
      } = await this.usersService.findAll(params)
      return response.status(200).json({
        data: users,
        message: [],
        meta
      } as ApiResponse<User>)
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .json(DEFAULT_SERVER_ERROR_RESPONSE as ApiResponse<User>) as Response
    }
  }

  @Get(':id')
  async findOne(
    @Res() response: Response, 
    @Param('id') id: string
  ): Promise<Response> {
    try {
      const user = await this.usersService.findOne(id)
      if(!user) {
        return response.status(404).json({
          data: {} as User,
          message: [
            {
              field: "user",
              error: "User not found"
            }
          ]
        }) as Response
      }
      return response.status(200).json({
        data: user as User,
        message: []
      } as ApiResponse<User>)
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .json(DEFAULT_SERVER_ERROR_RESPONSE as ApiResponse<User>) as Response
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(
    @Res() response: Response,
    @Param('id') id: string
  ): Promise<Response> {
    const notFound = await this.usersService.remove(id)
    if(notFound) {
      return response.status(404).json({
        data: {},
        message: [{
          field: "user",
          error: "User not found"
        }]
      } as ApiResponse<User>)
    }

    return response.status(204).send()
  }
}
