import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { Response } from 'express';
import { genSalt, hash } from 'bcrypt'
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.model';
import { ApiResponse } from 'src/interfaces/api.interfaces'
import { DEFAULT_SERVER_ERROR_RESPONSE } from 'src/constants/api.constants';

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
  ): Promise<Response> {
    try {
      const users = await this.usersService.findAll()
      return response.status(200).json({
        data: users as User[],
        message: []
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
