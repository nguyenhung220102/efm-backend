import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @IsEmail()
  @ApiProperty({ example: 'nguyena@gmail.com', description: 'Email of user' })
  readonly email: string;

  @IsString()
  @ApiProperty({ example: 'nguyena', description: 'Password of user' })
  readonly password: string;
}

export class SignUpDto extends SignInDto {
  @IsString()
  @ApiProperty({ example: 'Nguyen A', description: 'Name of user' })
  readonly name: string;
}
