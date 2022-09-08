import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Req,
  Res,
  Query,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { SystemResponse } from 'response-handler';

import { KpiService } from './kpi.service';
import { CreateKpiDto } from './dto/create-kpi.dto';
import { UpdateKpiDto } from './dto/update-kpi.dto';

@Controller('kpi')
export class KpiController {
  constructor(private readonly kpiService: KpiService) { }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(
    @Body() createKpiDto: CreateKpiDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { logger } = res.locals;
    try {
      const data = await this.kpiService.create(createKpiDto);
      logger.info({
        message: 'item added successfully',
        data: [],
        option: [],
      });
      return res.send(
        SystemResponse.success('item added successfully!', data),
      );
    } catch (err) {
      return res.send(SystemResponse.internalServerError('Error', err.message));
    }
  }

  @Get('list')
  async list(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Res() res: Response,
  ) {
    const { logger } = res.locals;
    try {
      const data = await this.kpiService.list(page, limit);
      logger.info({
        message: 'item details fetched successfully',
        data: [],
        option: [],
      });

      return res.send(
        SystemResponse.success('item details fetched successfully', data),
      );
    } catch (err) {
      return res.send(SystemResponse.internalServerError('Error', err.message));
    }
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { logger } = res.locals;
    try {
      const singleTodo = await this.kpiService.findOne(id);
      logger.info({
        message: 'item fetched successfully',
        data: [],
        option: [],
      });
      return res.send(
        SystemResponse.success('item fetched successfully', singleTodo),
      );
    } catch (err) {
      return res.send(SystemResponse.internalServerError('Error', err.message));
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateKpiDto: UpdateKpiDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { logger } = res.locals;

    try {
      const data = await this.kpiService.update(id, updateKpiDto);
      logger.info({
        message: 'item updated successfully',
        data: [],
        option: [],
      });
      return res.send(
        SystemResponse.success('item updated successfully', data),
      );
    } catch (err) {
      return res.send(SystemResponse.internalServerError('Error', err.message));
    }
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { logger } = res.locals;
    try {
      const data = await this.kpiService.softDelete(id);
      logger.info({
        message: 'item deleted successfully',
        data: [],
        option: [],
      });
      return res.send(
        SystemResponse.success('item deleted successfully', data),
      );
    } catch (err) {
      return res.send(SystemResponse.internalServerError('Error', err.message));
    }
  }
}
