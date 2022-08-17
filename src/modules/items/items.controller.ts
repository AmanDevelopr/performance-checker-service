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
  UseGuards,
  Req,
  Res,
  Query,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { SystemResponse } from 'response-handler';

import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { JwtAuthGuard } from '../../common/guard/jwt-auth-gaurd';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createItemDto: CreateItemDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { logger } = res.locals;
    try {
      const data = await this.itemsService.create(createItemDto);
      logger.info({
        message: 'item is added successfully',
        data: [],
        option: [],
      });
      return res.send(
        SystemResponse.success('item is added successfully!', data),
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
      const data = await this.itemsService.list(page, limit);
      /* istanbul ignore next */
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
      const singleTodo = await this.itemsService.findOne(id);
      logger.info({
        message: 'Single item fetched successfully',
        data: [],
        option: [],
      });
      return res.send(
        SystemResponse.success('single item fetched successfully', singleTodo),
      );
    } catch (err) {
      return res.send(SystemResponse.internalServerError('Error', err.message));
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { logger } = res.locals;

    try {
      const data = await this.itemsService.update(id, updateItemDto);
      /* istanbul ignore next */
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
  @UseGuards(JwtAuthGuard)
  async remove(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { logger } = res.locals;
    try {
      const data = await this.itemsService.softDelete(id);
      /* istanbul ignore next */
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
