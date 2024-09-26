import { ParamsDto } from "../dto/params.dto"

export interface Error {
  field: string,
  error: string
}

export interface ApiResponse<T> {
  data: T | T[],
  message: Error[],
  meta?: ParamsDto
}