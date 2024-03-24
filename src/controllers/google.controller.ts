import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GoogleService } from 'src/services/google.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
@Controller('google')
export class GoogleController {
  constructor(
    private readonly appService: GoogleService,
    private jwtService: JwtService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    return req.user;
  }
  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    return await this.appService.googleLogin(req, this.jwtService);
  }
}
