import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    { 
      whitelist: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(
          validationErrors.map(error => ({
            field: error.property,
            error: Object.values(error.constraints)
              .map(error_value => error_value[0].toUpperCase() + error_value.slice(1))
              .join(". ")
          }))
        )
      }
    }
  ))
  await app.listen(3000);
}
bootstrap();
