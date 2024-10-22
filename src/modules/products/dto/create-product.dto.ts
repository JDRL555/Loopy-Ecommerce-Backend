import { Color, Size } from "@prisma/client";
import { 
  ArrayMinSize, 
  IsArray, 
  IsBoolean, 
  IsEnum, 
  IsNotEmpty, 
  IsNumber, 
  IsOptional, 
  IsString, 
  IsUrl 
} from "class-validator";
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

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  price_offer: number = 0

  @IsBoolean()
  @IsOptional()
  is_offer: boolean = false

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
