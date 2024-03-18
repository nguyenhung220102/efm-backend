import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSampleDto {
  @IsString()
  @ApiProperty({
    example: 'Content of sample',
    description: 'Content of sample',
  })
  readonly content: string;
}
