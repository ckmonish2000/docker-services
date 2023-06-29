import { IsOptional, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty({
    description: 'name of the product',
    default: 'CD',
  })
  @Length(2, 50)
  @IsOptional()
  productName?: string;

  @ApiProperty({
    description: 'no.of product',
    default: 5,
  })
  @IsOptional()
  quantity?: number;
}
