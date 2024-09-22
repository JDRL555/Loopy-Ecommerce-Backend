import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './users.model';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({ data: createUserDto });
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany()
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
