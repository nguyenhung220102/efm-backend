import {
  Injectable,
  Body,
  Param,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sample, SampleDocument } from '../models/sample.model';
import { User } from 'src/models/user.model';
import { CreateSampleDto } from 'src/dto/sample.dto';
@Injectable()
export class SampleService {
  constructor(
    @InjectModel(Sample.name) private sampleModel: Model<SampleDocument>,
  ) {}

  async create(user: User, @Body() body: CreateSampleDto): Promise<Sample> {
    const sample = new this.sampleModel({ ...body, createdBy: user });
    const savedSample = await sample.save();
    return savedSample;
  }

  async getById(user: User, @Param() params): Promise<Sample> {
    const sample = await this.sampleModel.findById(params.id).exec();

    // If you want to include creator info in sample
    // const sample = await this.sampleModel
    // .findOne({ _id: params.id })
    // .populate('createdBy')
    // .exec();
    if (!sample) {
      throw new NotFoundException('Sample not found');
    }
    //Authorization
    if (sample.createdBy.toString() !== user._id.toString()) {
      throw new UnauthorizedException(
        'User is not authorized to access this sample',
      );
    }
    return sample;
  }

  async getAll(user: User): Promise<Sample[]> {
    const samples = await this.sampleModel.find({ createdBy: user._id }).exec();
    if (!samples || samples.length === 0) {
      throw new NotFoundException('No samples found');
    }
    return samples;
  }

  async update(
    user: User,
    @Param() params,
    @Body() body: CreateSampleDto,
  ): Promise<Sample> {
    const sample = await this.sampleModel.findById(params.id).exec();
    if (!sample) {
      throw new NotFoundException('Sample not found');
    }
    if (sample.createdBy.toString() !== user._id.toString()) {
      throw new UnauthorizedException(
        'User is not authorized to update this sample',
      );
    }
    sample.content = body.content;
    const updatedSample = await sample.save();
    return updatedSample;
  }

  async delete(user: User, @Param() params): Promise<void> {
    const sample = await this.sampleModel.findById(params.id).exec();
    if (!sample) {
      throw new NotFoundException('Sample not found');
    }

    if (sample.createdBy.toString() !== user._id.toString()) {
      throw new UnauthorizedException(
        'User is not authorized to access this sample',
      );
    }
    await this.sampleModel.findByIdAndDelete(params.id).exec();
  }
}
