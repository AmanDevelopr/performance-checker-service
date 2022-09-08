import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { CreateKpiDto } from './dto/create-kpi.dto';
import { UpdateKpiDto } from './dto/update-kpi.dto';
import { Kpi } from './schema/kpi.schema';

@Injectable()
export class KpiService {
  constructor(
    @InjectModel(Kpi.name)
    private readonly kpiModel: mongoose.Model<Kpi>,
  ) { }
  public static createObjectId() {
    return String(new mongoose.Types.ObjectId());
  }

  async softUpdate(originalId: string): Promise<mongoose.UpdateQuery<Kpi>> {
    const data = await this.kpiModel.updateOne(
      { originalId, updatedAt: undefined, deletedAt: undefined },
      { updatedAt: Date.now() },
    );
    return data;
  }

  async softDelete(originalId: string): Promise<mongoose.UpdateQuery<Kpi>> {
    return await this.kpiModel.updateOne(
      { originalId, updatedAt: undefined, deletedAt: undefined },
      { deletedAt: Date.now() },
    );
  }

  async create(createKpiDto: CreateKpiDto): Promise<Kpi> {
    const createData = {
      ...createKpiDto,
    };

    const id = KpiService.createObjectId();
    const dataCreate = {
      originalId: id,
      ...createData,
    };
    return await this.kpiModel.create(dataCreate);
  }

  async list(page?: number, limit?: number): Promise<Kpi[]> {
    if (!page) {
      page = 1;
    }
    if (!limit) {
      limit = 5;
    }
    const skip = (page - 1) * limit;
    const list = await this.kpiModel.find({
      deletedAt: undefined,
      updatedAt: undefined,
    })
      .limit(limit)
      .skip(skip);
    if (!list || list.length === 0) {
      throw new NotFoundException('Could not find items list');
    }
    return list;
  }

  async findOne(id: string): Promise<Kpi> {
    const single = await this.kpiModel.findOne({ 
      originalId: id,
      deletedAt: undefined,
      updatedAt: undefined,
     });
    if (!single) {
      throw new NotFoundException('OOPS! No data found, check service');
    }
    return single;
  }
  
  async update(id: string, updateKpiDto: UpdateKpiDto): Promise<Kpi> {
    const editedData = await this.kpiModel.findOne({
      originalId: id,
      deletedAt: undefined,
      updatedAt: undefined,
    });

    if (updateKpiDto.name) {
      editedData.name = updateKpiDto.name;
    }

    await this.softUpdate(id);
    const newData = {
      ...updateKpiDto,
      ...editedData,
      originalId: id,
      name: editedData.name,
      createdBy: editedData.createdBy,
      updatedAt: undefined,
    };
    delete newData.updatedAt;
    return await this.kpiModel.create({
      ...newData,
    });
  }

  async remove(id: string): Promise<Kpi> {
    return this.kpiModel.findByIdAndDelete(id);
  }
}
