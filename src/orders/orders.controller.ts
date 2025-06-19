import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('checkout')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() data: { items: any[] }) {
    console.log('📦 Recebido no backend:', data);
    return this.ordersService.create(data.items);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }
}