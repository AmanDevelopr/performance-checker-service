import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './schema/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: mongoose.Model<Category>,
  ) { }
  public static createObjectId() {
    return String(new mongoose.Types.ObjectId());
  }

  async softUpdate(
    originalId: string,
  ): Promise<mongoose.UpdateQuery<Category>> {
    const data = await this.categoryModel.updateOne(
      { originalId, updatedAt: undefined, deletedAt: undefined },
      { updatedAt: Date.now() },
    );
    return data;
  }

  async softDelete(
    originalId: string,
  ): Promise<mongoose.UpdateQuery<Category>> {
    return await this.categoryModel.updateOne(
      { originalId, updatedAt: undefined, deletedAt: undefined },
      { deletedAt: Date.now() },
    );
  }

  async create(
    createCategoryDto: CreateCategoryDto): Promise<Category> {
    const createData = {
      ...createCategoryDto,
    };

    const id = CategoryService.createObjectId();
    const dataCreate = {
      originalId: id,
      ...createData,
    };
    return await this.categoryModel.create(dataCreate);

  }
 
  async list(
    page?: number,
    limit?: number,
  ): Promise<Category[]> {
    if (!page) {
      page = 1;
    }
    if (!limit) {
      limit = 5;
    }
    const skip = (page - 1) * limit;
    const list = await this.categoryModel
      .find()
      .limit(limit)
      .skip(skip);
    if (!list || list.length === 0) {
      /* istanbul ignore next */
      throw new NotFoundException('Could not find category list');
    }
    return list;
  }

  async findOne(id: string): Promise<Category> {
    const single = await this.categoryModel.findOne({ originalId: id });
    if (!single) {
      throw new NotFoundException('OOPS! No data found, check service');
    }
    return single;
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const editedData = await this.categoryModel.findOne({
      originalId: id,
      deletedAt: undefined,
      updatedAt: undefined,
    });

    if (updateCategoryDto.categoryName) {
      editedData.categoryName = updateCategoryDto.categoryName;
    }

    if (updateCategoryDto.parentId) {
      editedData.parentId = updateCategoryDto.parentId;
    }


    await this.softUpdate(id);
    const newData = {
      ...updateCategoryDto,
      ...editedData,
      originalId: id,
      categoryName: editedData.categoryName,
      parentId: editedData.parentId,
      updatedAt: undefined,
    };
    delete newData.updatedAt;
    return await this.categoryModel.create({
      ...newData,
    });
  }

  async remove(id: string): Promise<Category> {
    return this.categoryModel.findByIdAndDelete(id);
  }

}
