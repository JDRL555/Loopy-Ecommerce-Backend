import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './model/users.model';
import { UserParamsDto } from './dto/user-params.dto';
import { ApiResponse } from 'src/global/interfaces/api.interfaces';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.prisma.user.create({ data: createUserDto })
    await this.prisma.cart.create({ data: {} })
    return user;
  }

  async findAll(params: UserParamsDto): Promise<ApiResponse<User>> {
    const page = params.page
    const perPage = params.limit
    const filter = params.filter
    const total = await this.prisma.user.count({
      where: filter
    })
    return {
      data: await this.prisma.user.findMany({
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

  async findOne(id: string): Promise<User | null> {
    return await this.prisma.user.findFirst({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    return await this.prisma.user.update({
      data: updateUserDto,
      where: { id }
    });
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.prisma.user.delete({ where: { id } });
      return false
    } catch (error) {
      return true
    }
  }
}
