import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../models/user.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class GoogleService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  async googleLogin(req, jwt: JwtService) {
    if (!req.user) {
      return 'No user from google';
    }
    const existingUser = await this.userModel
      .findOne({ email: req.user.email })
      .exec();
    if (existingUser) {
      const payload = { email: req.user.email };
      return {
        token: jwt.sign(payload),
      };
    }
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(req.user.accessToken, salt);
    const reqBody = {
      name: req.user.firstName + ' ' + req.user.lastName,
      email: req.user.email,
      password: hash,
    };
    const newUser = new this.userModel(reqBody);
    await newUser.save();
    const payload = { email: req.user.email };
    return {
      token: jwt.sign(payload),
    };
  }
}
