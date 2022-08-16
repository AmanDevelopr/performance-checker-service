import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards, Req, Res, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from '../../common/guard/jwt-auth-gaurd';
import { Request, Response } from 'express';
import { SystemResponse } from 'response-handler';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}


  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  async create(@Body() createCategoryDto: CreateCategoryDto,
  @Req() req: Request,
  @Res() res: Response,) {
    const { logger } = res.locals;
    try {
    const data= await this.categoryService.create( createCategoryDto);
    logger.info({
      message: 'Category is added successfully',
      data: [],
      option: [],
    });
    return res.send(
      SystemResponse.success('category is added successfully!', data),
    );
  }
  catch(err){
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
    const data = await this.categoryService.list(page, limit);
     /* istanbul ignore next */
    logger.info({
      message: 'category details fetched successfully',
      data: [],
      option: [],
    });

    return res.send(
      SystemResponse.success('category details fetched successfully', data),
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
    const singleTodo = await this.categoryService.findOne(id);
    logger.info({
      message: 'Single category fetched successfully',
      data: [],
      option: [],
    });
    return res.send(
      SystemResponse.success('single category fetched successfully', singleTodo),
    );
  } catch (err) {
    return res.send(SystemResponse.internalServerError('Error', err.message));
  }
}

@Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { logger } = res.locals;

    try {
      const data = await this.categoryService.update(
        id,
        updateCategoryDto,
      );
      /* istanbul ignore next */
      logger.info({
        message: 'category updated successfully',
        data: [],
        option: [],
      });
      return res.send(
        SystemResponse.success('category updated successfully', data),
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
      const data = await this.categoryService.softDelete(id);
      /* istanbul ignore next */
      logger.info({
        message: 'category deleted successfully',
        data: [],
        option: [],
      });
      return res.send(
        SystemResponse.success('category deleted successfully', data),
      );
    } catch (err) {
      return res.send(SystemResponse.internalServerError('Error', err.message));
    }
  }
}