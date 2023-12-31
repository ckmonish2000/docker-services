import { IsOptional, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'name of the product',
    default: 'CD',
  })
  @Length(2, 50)
  @IsNotEmpty({ message: 'Product should have a name' })
  productName: string;

  @ApiProperty({
    description: 'no.of product',
    default: 10,
  })
  @IsOptional()
  quantity?: number;
}
