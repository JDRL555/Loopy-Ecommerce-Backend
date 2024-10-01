import { Transform, Type } from "class-transformer";
import { 
  IsOptional,
} from "class-validator";
import { ParamsDto } from "src/global/dto/params.dto";
import { UpdateCartDto } from "./update-cart.dto";
import { BadRequestException } from "@nestjs/common";

export class CartParamsDto extends ParamsDto {
  @Transform(({ value }) => {
    if(typeof value === "string") {
      try {
        return JSON.parse(value) as UpdateCartDto
      } catch (error) {
        throw new BadRequestException("Invalid JSON")
      }
    }
    return value as UpdateCartDto
  })
  @IsOptional()
  @Type(() => UpdateCartDto)
  filter?: UpdateCartDto = {}
}