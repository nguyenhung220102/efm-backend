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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import { SampleService } from '../services/sample.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateSampleDto } from 'src/dto/sample.dto';
@ApiBearerAuth('JWT-auth')
@ApiTags('Sample')
@Controller('/api/sample')
export class SampleController {
  constructor(private readonly sampleServerice: SampleService) {}
  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create sample' })
  @ApiResponse({ status: 201, description: 'OK.' })
  async createSample(
    @Response() response,
    @Request() request,
    @Body() body: CreateSampleDto,
  ) {
    const sample = await this.sampleServerice.create(request.user, body);
    return response.status(HttpStatus.CREATED).json({
      sample,
    });
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  @ApiOperation({ summary: 'Get sample by id' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'id of sample',
    schema: { oneOf: [{ type: 'string' }, { type: 'integer' }] },
  })
  @ApiResponse({ status: 200, description: 'OK.' })
  async getSample(@Response() response, @Request() request, @Param() params) {
    const sample = await this.sampleServerice.getById(request.user, params);
    return response.status(HttpStatus.OK).json({
      sample,
    });
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all sample' })
  @ApiResponse({ status: 200, description: 'OK.' })
  async getAll(@Response() response, @Request() request) {
    const sample = await this.sampleServerice.getAll(request.user);
    return response.status(HttpStatus.OK).json({
      sample,
    });
  }

  @UseGuards(AuthGuard)
  @Put('/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'id of sample',
    schema: { oneOf: [{ type: 'string' }, { type: 'integer' }] },
  })
  @ApiOperation({ summary: 'Update a sample' })
  @ApiResponse({ status: 200, description: 'OK.' })
  async updateSample(
    @Response() response,
    @Request() request,
    @Param() params,
    @Body() Body: CreateSampleDto,
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
  @ApiParam({
    name: 'id',
    required: true,
    description: 'id of sample',
    schema: { oneOf: [{ type: 'string' }, { type: 'integer' }] },
  })
  @ApiOperation({ summary: 'Delete a sample' })
  @ApiResponse({ status: 200, description: 'OK.' })
  async deleteSample(
    @Response() response,
    @Request() request,
    @Param() params,
  ) {
    await this.sampleServerice.delete(request.user, params);
    return response.status(HttpStatus.OK).json({
      message: 'Sample deleted successfully',
    });
  }
}
