import {
  IsString,
  IsNotEmpty,
  IsDateString
} from 'class-validator'

export class CreateCartDto {
  @IsNotEmpty()
  @IsString()
  user_id: string

  @IsDateString()
  created_at: string = Date.now().toString()
  
  @IsDateString()
  updated_at: string = Date.now().toString()
}
