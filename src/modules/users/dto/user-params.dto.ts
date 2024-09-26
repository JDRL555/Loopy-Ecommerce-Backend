import { Transform, Type } from "class-transformer";
import { 
  IsOptional,
} from "class-validator";
import { ParamsDto } from "src/global/dto/params.dto";
import { UpdateUserDto } from "./update-user.dto";
import { BadRequestException } from "@nestjs/common";

export class UserParamsDto extends ParamsDto {
  @Transform(({ value }) => {
    if(typeof value === "string") {
      try {
        return JSON.parse(value) as UpdateUserDto
      } catch (error) {
        throw new BadRequestException("Invalid JSON")
      }
    }
    return value as UpdateUserDto
  })
  @IsOptional()
  @Type(() => UpdateUserDto)
  filter?: UpdateUserDto = {}
}