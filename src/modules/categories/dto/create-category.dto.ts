import {
  IsString,
  IsNotEmpty,
  MaxLength
} from 'class-validator'

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string
}
