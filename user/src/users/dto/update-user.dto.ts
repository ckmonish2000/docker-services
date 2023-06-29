import { ApiProperty } from '@nestjs/swagger';
import { Length, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: "user's firstName",
    default: 'jessy',
  })
  @IsOptional()
  @Length(2, 20)
  firstName?: string;

  @ApiProperty({
    description: "user's lastName",
    default: 'pinkman',
  })
  @IsOptional()
  @Length(2, 20)
  lastName?: string;

  @ApiProperty({
    description: "user's status",
    default: true,
  })
  @IsOptional()
  isActive?: boolean;
}
