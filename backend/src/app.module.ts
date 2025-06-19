import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { PrismaModule } from './prisma/prisma.module'; // 👈 aqui

@Module({
  imports: [ProductsModule, OrdersModule, PrismaModule], // 👈 aqui
})
export class AppModule {}
