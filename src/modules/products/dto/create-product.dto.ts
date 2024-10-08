import { Color, Size } from "@prisma/client";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsDecimal, IsEnum, IsNotEmpty, IsNumber, IsString, IsUrl, ValidateNested } from "class-validator";
export class CreateProductDto {
  @IsNotEmpty()
  @IsUrl()
  img_url: string

  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsNumber()
  available_units: number

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  price: number

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsEnum(Color, { each: true })
  colors: Color[]

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsEnum(Size, { each: true })
  sizes: Array<Size>

  @IsNotEmpty()
  @IsString()
  categoryId: string
}
