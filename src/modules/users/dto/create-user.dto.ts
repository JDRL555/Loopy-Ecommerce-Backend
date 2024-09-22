import { 
  IsEmail, 
  IsEnum, 
  IsNotEmpty, 
  IsString, 
  MinLength
} from 'class-validator'

import { Role } from '@prisma/client'

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  first_name: string
  
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  last_name: string

  @IsNotEmpty()
  @IsEmail()
  @MinLength(1)
  email: string
  
  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  password: string

  @IsEnum(Role)
  role: Role = "CLIENT"
}
