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
import { KpiHierarchyService } from './kpi-hierarchy.service';
import { CreateKpiHierarchyDto } from './dto/create-kpi-hierarchy.dto';
import { UpdateKpiHierarchyDto } from './dto/update-kpi-hierarchy.dto';

@Controller('kpi-hierarchy')
export class KpiHierarchyController {
  constructor(private readonly kpiHierarchyService: KpiHierarchyService) {}

  @Post(':id')
  async createParent(
    @Param('id') id: string, // originalId from kpi table
    @Req() req: Request,
    @Res() res: Response
    ) {
    const { logger } = res.locals;
    try {
      
      const data = await this.kpiHierarchyService.createParent(id);
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

  @Post('child/:id')
  @UsePipes(new ValidationPipe())
  async create(
    @Body() createKpiHierarchyDto: CreateKpiHierarchyDto,
    @Param('id') id: string, // kpiId of main parent from KpiHierarchy table
    @Req() req: Request,
    @Res() res: Response
    ) {
    const { logger } = res.locals;
    try {
      
      const data = await this.kpiHierarchyService.create(id, createKpiHierarchyDto);
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

  @Get()
  findAll() {
    return this.kpiHierarchyService.list();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kpiHierarchyService.findOneParent(id);
  }

  @Get('aggregate/relationship')
  find() {
    return this.kpiHierarchyService.get();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kpiHierarchyService.softDelete(id);
  }
}
