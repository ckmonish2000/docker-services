import { IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateOrderDto {
  @ApiProperty({
    default: 'uuid',
    description:
      'OrderId needs to be an UUID and if you dont pass a value we will generate it for you',
  })
  @IsOptional()
  @IsUUID()
  orderID: string;

  @ApiProperty({
    description: 'Order status',
    default: false,
  })
  @IsOptional()
  isCancelled: boolean;
}
