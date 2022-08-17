import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Items } from './schema/items.schema';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Items.name)
    private readonly itemsModel: mongoose.Model<Items>,
  ) {}
  public static createObjectId() {
    return String(new mongoose.Types.ObjectId());
  }

  async softUpdate(originalId: string): Promise<mongoose.UpdateQuery<Items>> {
    const data = await this.itemsModel.updateOne(
      { originalId, updatedAt: undefined, deletedAt: undefined },
      { updatedAt: Date.now() },
    );
    return data;
  }

  async softDelete(originalId: string): Promise<mongoose.UpdateQuery<Items>> {
    return await this.itemsModel.updateOne(
      { originalId, updatedAt: undefined, deletedAt: undefined },
      { deletedAt: Date.now() },
    );
  }
  async create(createItemDto: CreateItemDto): Promise<Items> {
    const createData = {
      ...createItemDto,
    };

    const id = ItemsService.createObjectId();
    const dataCreate = {
      originalId: id,
      ...createData,
    };
    return await this.itemsModel.create(dataCreate);
  }

  async list(page?: number, limit?: number): Promise<Items[]> {
    if (!page) {
      page = 1;
    }
    if (!limit) {
      limit = 5;
    }
    const skip = (page - 1) * limit;
    const list = await this.itemsModel.find().limit(limit).skip(skip);
    if (!list || list.length === 0) {
      /* istanbul ignore next */
      throw new NotFoundException('Could not find items list');
    }
    return list;
  }

  async findOne(id: string): Promise<Items> {
    const single = await this.itemsModel.findOne({ originalId: id });
    if (!single) {
      throw new NotFoundException('OOPS! No data found, check service');
    }
    return single;
  }

  async update(id: string, updateItemDto: UpdateItemDto): Promise<Items> {
    const editedData = await this.itemsModel.findOne({
      originalId: id,
      deletedAt: undefined,
      updatedAt: undefined,
    });

    if (updateItemDto.item) {
      editedData.item = updateItemDto.item;
    }

    if (updateItemDto.subCategory) {
      editedData.subCategory = updateItemDto.subCategory;
    }

    if (updateItemDto.category) {
      editedData.category = updateItemDto.category;
    }

    await this.softUpdate(id);
    const newData = {
      ...updateItemDto,
      ...editedData,
      originalId: id,
      item: editedData.item,
      subCategory: editedData.subCategory,
      category: editedData.category,
      updatedAt: undefined,
    };
    delete newData.updatedAt;
    return await this.itemsModel.create({
      ...newData,
    });
  }

  async remove(id: string): Promise<Items> {
    return this.itemsModel.findByIdAndDelete(id);
  }
}
