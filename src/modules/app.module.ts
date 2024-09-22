import { Module } from '@nestjs/common';
import { UsersModule } from '../modules/users/users.module';
import { AuthModule } from '../modules/auth/auth.module';
import { ProductsModule } from '../modules/products/products.module';
import { CartModule } from '../modules/cart/cart.module';
import { CategoriesModule } from '../modules/categories/categories.module';
import { PaymentsModule } from '../modules/payments/payments.module';
import { OrdersModule } from '../modules/orders/orders.module';

@Module({
  imports: [UsersModule, AuthModule, ProductsModule, CartModule, CategoriesModule, PaymentsModule, OrdersModule],
})
export class AppModule {}
