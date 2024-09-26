import { ValidationError } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { ApiResponse } from "../interfaces/api.interfaces";

export async function validateFilter<T extends new () => {}>(
  dto: T,
  object: object
): Promise<ApiResponse<T>> {
  const instance = plainToClass(dto, object)
  const errors = await validate(instance)
  
  if(errors.length > 0) {
    return {
      data: [],
      message: errors.map(error => ({ 
        field: error.property, 
        error: Object.values(error.constraints).join(", ") 
      })),
      meta: {}
    }
  }
  return {
    data: [],
    message: [],
    meta: {}
  }
}