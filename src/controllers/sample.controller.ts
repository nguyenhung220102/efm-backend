import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Response,
  UseGuards,
  Request,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { SampleService } from '../services/sample.service';
import { AuthGuard } from 'src/guards/auth.guard';
@Controller('/api/sample')
export class SampleController {
  constructor(private readonly sampleServerice: SampleService) {}
  @UseGuards(AuthGuard)
  @Post()
  async createSample(@Response() response, @Request() request, @Body() body) {
    const sample = await this.sampleServerice.create(request.user, body);
    return response.status(HttpStatus.CREATED).json({
      sample,
    });
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async getSample(@Response() response, @Request() request, @Param() params) {
    const sample = await this.sampleServerice.getById(request.user, params);
    return response.status(HttpStatus.OK).json({
      sample,
    });
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAll(@Response() response, @Request() request) {
    const sample = await this.sampleServerice.getAll(request.user);
    return response.status(HttpStatus.OK).json({
      sample,
    });
  }

  @UseGuards(AuthGuard)
  @Put('/:id')
  async updateSample(
    @Response() response,
    @Request() request,
    @Param() params,
    @Body() Body,
  ) {
    const sample = await this.sampleServerice.update(
      request.user,
      params,
      Body,
    );
    return response.status(HttpStatus.OK).json({
      sample,
    });
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async deleteSample(
    @Response() response,
    @Request() request,
    @Param() params,
    @Body() Body,
  ) {
    await this.sampleServerice.delete(request.user, params);
    return response.status(HttpStatus.OK).json({
      message: 'Sample deleted successfully',
    });
  }
}
