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
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/guards/auth.guard';
@Controller('/api/user')
export class UserController {
  constructor(
    private readonly userServerice: UserService,
    private jwtService: JwtService,
  ) {}
  @Post('/signup')
  async Signup(@Response() response, @Body() user: User) {
    const userInfo = await this.userServerice.signup(user, this.jwtService);
    return response.status(HttpStatus.CREATED).json({
      userInfo,
    });
  }
  @Post('/signin')
  async SignIn(@Response() response, @Body() user: User) {
    const token = await this.userServerice.signin(user, this.jwtService);
    return response.status(HttpStatus.OK).json(token);
  }

  @UseGuards(AuthGuard)
  @Get('/profile')
  async get(@Response() response, @Request() request) {
    return response.status(HttpStatus.OK).json(request.user);
  }
}
