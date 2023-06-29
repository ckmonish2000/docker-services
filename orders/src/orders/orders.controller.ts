import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Orders } from './order.entity';
import { OrdersService } from './orders.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { UpdateOrderDto } from './dto/update-order.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The order has been successfully created.',
  })
  create(@Body() createOrder: CreateOrderDto): Promise<Orders> {
    return this.ordersService.create(createOrder);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns all the orders.',
  })
  findAll(): Promise<Orders[]> {
    return this.ordersService.findAll();
  }

  @Get(':orderID')
  @ApiResponse({
    status: 200,
    description: 'Returns a single order.',
  })
  findOne(
    @Param('orderID', new ParseUUIDPipe()) orderID: string,
  ): Promise<Orders> {
    return this.ordersService.findOne(orderID);
  }

  @Delete(':orderID')
  @ApiResponse({
    status: 200,
    description: 'The order has been successfully removed.',
  })
  remove(
    @Param('orderID', new ParseUUIDPipe()) orderID: string,
  ): Promise<void> {
    return this.ordersService.remove(orderID);
  }

  @Put(':orderID')
  @ApiResponse({
    status: 200,
    description: 'The order has been successfully updated.',
  })
  update(
    @Param('orderID', new ParseUUIDPipe()) orderID: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.update(orderID, updateOrderDto);
  }
}
