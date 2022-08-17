import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  UseGuards,
  ValidationPipe,
  Req,
  Res,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SystemResponse } from 'response-handler';

import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '../../common/guard/jwt-auth-gaurd';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { logger } = res.locals;
    try {
      const data = await this.projectsService.create(createProjectDto);
      logger.info({
        message: 'project is added successfully',
        data: [],
        option: [],
      });
      return res.send(
        SystemResponse.success('project is added successfully!', data),
      );
    } catch (err) {
      return res.send(SystemResponse.internalServerError('Error', err.message));
    }
  }

  @Get('list')
  @UseGuards(JwtAuthGuard)
  async list(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Res() res: Response,
  ) {
    const { logger } = res.locals;
    try {
      const data = await this.projectsService.list(page, limit);
      /* istanbul ignore next */
      logger.info({
        message: 'Project details fetched successfully',
        data: [],
        option: [],
      });

      return res.send(
        SystemResponse.success('Project details fetched successfully', data),
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
      const singleTodo = await this.projectsService.findOne(id);
      logger.info({
        message: 'Single Project fetched successfully',
        data: [],
        option: [],
      });
      return res.send(
        SystemResponse.success(
          'single project fetched successfully',
          singleTodo,
        ),
      );
    } catch (err) {
      return res.send(SystemResponse.internalServerError('Error', err.message));
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { logger } = res.locals;

    try {
      const data = await this.projectsService.update(id, updateProjectDto);
      /* istanbul ignore next */
      logger.info({
        message: 'Project updated successfully',
        data: [],
        option: [],
      });
      return res.send(
        SystemResponse.success('Project updated successfully', data),
      );
    } catch (err) {
      return res.send(SystemResponse.internalServerError('Error', err.message));
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { logger } = res.locals;
    try {
      const data = await this.projectsService.softDelete(id);
      /* istanbul ignore next */
      logger.info({
        message: 'Project deleted successfully',
        data: [],
        option: [],
      });
      return res.send(
        SystemResponse.success('Project deleted successfully', data),
      );
    } catch (err) {
      return res.send(SystemResponse.internalServerError('Error', err.message));
    }
  }
}
