import {
  IsString,
  IsNotEmpty
} from 'class-validator'

export class CreateCartDto {
  @IsNotEmpty()
  @IsString()
  userId: string
}
