import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Response,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/guards/auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SignInDto } from 'src/dto/user.dto';
import { SignUpDto } from 'src/dto/user.dto';

@ApiTags('Authentication')
@Controller('/api/user')
export class UserController {
  constructor(
    private readonly userServerice: UserService,
    private jwtService: JwtService,
  ) {}

  @ApiOperation({ summary: 'Sign up' })
  @ApiResponse({ status: 200, description: 'OK.' })
  @Post('/signup')
  async Signup(@Response() response, @Body() user: SignUpDto) {
    const userInfo = await this.userServerice.signup(user, this.jwtService);
    return response.status(HttpStatus.CREATED).json({
      userInfo,
    });
  }
  @Post('/signin')
  @ApiOperation({ summary: 'Sign in' })
  @ApiResponse({ status: 200, description: 'OK.' })
  async SignIn(@Response() response, @Body() user: SignInDto) {
    const token = await this.userServerice.signin(user, this.jwtService);
    return response.status(HttpStatus.OK).json(token);
  }

  @UseGuards(AuthGuard)
  @Get('/profile')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'OK.' })
  @ApiBearerAuth('JWT-auth')
  async get(@Response() response, @Request() request) {
    return response.status(HttpStatus.OK).json(request.user);
  }
}
