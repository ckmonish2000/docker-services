import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: "user's firstName",
    default: 'walter',
  })
  @IsNotEmpty({ message: 'firstName is required' })
  @Length(2, 20)
  firstName: string;

  @ApiProperty({
    description: "user's lastname",
    default: 'white',
  })
  @IsNotEmpty({ message: 'lastName is required' })
  @Length(2, 20)
  lastName: string;
}
