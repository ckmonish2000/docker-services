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
import { Product } from './product.entity';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiResponse } from '@nestjs/swagger';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created.',
  })
  create(@Body() createUserDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createUserDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns list of products.',
  })
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':productID')
  @ApiResponse({
    status: 200,
    description: 'Returns a single product.',
  })
  findOne(
    @Param('productID', new ParseUUIDPipe()) productID: string,
  ): Promise<Product> {
    return this.productsService.findOne(productID);
  }

  @Delete(':productID')
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully removed.',
  })
  remove(
    @Param('productID', new ParseUUIDPipe()) productID: string,
  ): Promise<void> {
    return this.productsService.remove(productID);
  }

  @Put(':productID')
  @ApiResponse({
    status: 200,
    description: 'The order has been successfully updated.',
  })
  update(
    @Param('productID', new ParseUUIDPipe()) productID: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(productID, updateProductDto);
  }
}
