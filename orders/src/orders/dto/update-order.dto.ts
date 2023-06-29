import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto {
  @ApiProperty({
    description: 'Order status',
    default: false,
  })
  @IsNotEmpty()
  isCancelled: boolean;
}
