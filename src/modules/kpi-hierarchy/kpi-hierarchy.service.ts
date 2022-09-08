import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { KpiService } from '../kpi/kpi.service';
import { Kpi } from '../kpi/schema/kpi.schema';
import { CreateKpiHierarchyDto } from './dto/create-kpi-hierarchy.dto';
import { UpdateKpiHierarchyDto } from './dto/update-kpi-hierarchy.dto';
import { KpiHierarchy } from './schema/kpi-hierarchy.schema';

@Injectable()
export class KpiHierarchyService {
  constructor(
    @Inject(KpiService)
    private readonly kpiService: KpiService,
    @InjectModel(KpiHierarchy.name)
    private readonly kpiHierarchyModel: mongoose.Model<KpiHierarchy>,
  ) { }
  public static createObjectId() {
    return String(new mongoose.Types.ObjectId());
  }

  async softUpdate(originalId: string): Promise<mongoose.UpdateQuery<KpiHierarchy>> {
    const data = await this.kpiHierarchyModel.updateOne(
      { originalId, updatedAt: undefined, deletedAt: undefined },
      { updatedAt: Date.now() },
    );
    return data;
  }

  async softDelete(originalId: string): Promise<mongoose.UpdateQuery<KpiHierarchy>> {
    return await this.kpiHierarchyModel.updateOne(
      { originalId, updatedAt: undefined, deletedAt: undefined },
      { deletedAt: Date.now() },
    );
  }

  async createParent(data): Promise<KpiHierarchy> {
    const kpiData = await this.kpiService.findOne(data.id);
    const createData = {
      kpiId: kpiData.originalId,
      createdBy: kpiData.createdBy,
    };

    const Id = KpiHierarchyService.createObjectId();
    const dataCreate = {
      originalId: Id,
      ...createData,
    };
    return await this.kpiHierarchyModel.create(dataCreate);
  }

  async create(data, createKpiHierarchyDto: CreateKpiHierarchyDto): Promise<KpiHierarchy> {
    const kpiParentData = await this.findOneParent(data.id);
    const createData = {
      parentKpiId: kpiParentData.kpiId,
      createdBy: kpiParentData.createdBy,
      ...createKpiHierarchyDto,
    };

    const Id = KpiHierarchyService.createObjectId();
    const dataCreate = {
      originalId: Id,
      ...createData,
    };
    return await this.kpiHierarchyModel.create(dataCreate);
  }

  async list(page?: number, limit?: number): Promise<KpiHierarchy[]> {
    if (!page) {
      page = 1;
    }
    if (!limit) {
      limit = 5;
    }
    const skip = (page - 1) * limit;
    const list = await this.kpiHierarchyModel.find({
      parentKpiId: 'null',
      deletedAt: undefined,
      updatedAt: undefined,
    })
      .limit(limit)
      .skip(skip);
    if (!list || list.length === 0) {
      /* istanbul ignore next */
      throw new NotFoundException('Could not find items list');
    }
    return list;
  }

  async get() {
    const data = this.kpiHierarchyModel.aggregate(
      [
        {
          $match: {
            parentKpiId: 'null'  // global
          }
        }, {
          $graphLookup: {
            from: 'kpihierarchies', 
            startWith: '$kpiId', 
            connectFromField: 'kpiId', 
            connectToField: 'parentKpiId', 
            as: 'items', 
            maxDepth: 3, 
            depthField: 'depth'
          }
        },
        //  {
        //   $unwind: {
        //     path: '$items'
        //   }
        // },
        //  {
        //   $lookup: {
        //     'from': Kpi.name, 
        //     'localField': 'items.kpiId', 
        //     'foreignField': 'originalId', 
        //     'as': 'childrenKPI'
        //   }
        // }, {
        //   '$replaceRoot': {
        //     'newRoot': {
        //       '$mergeObjects': [
        //         {
        //           '$arrayElemAt': [
        //             '$childrenKPI', 0
        //           ]
        //         }, '$$ROOT'
        //       ]
        //     }
        //   }
        // }, 
      
        //   {
        //   '$project': {
        //     'kpiId': '$originalId', 
        //     'parentKpiId': '$items.parentKpiId', 
        //     'name': '$name', 
        //     'createdAt': '$createdAt', 
        //     'createdBy': '$createdBy', 
        //     '_id': 0
        //   }
        // }, {
        //   '$merge': {
        //     'into': 'supremeHierarchy', 
        //     'on': 'kpiId'
        //   }
        // }
      ]
      
    )
    return data;
  }

  async getParent() {
    const data = this.kpiHierarchyModel.aggregate(
      [
        {
          $match: {
           kpiId: '63184bb0bdf0aeac54a74efc',  // for any particular kpi item
          }
        }, {
          $graphLookup: {
            from: 'kpihierarchies', 
            startWith: '$kpiId', 
            connectFromField: 'kpiId', 
            connectToField: 'parentKpiId', 
            as: 'items', 
            maxDepth: 3, 
            depthField: 'depth'
          }
        },
        //  {
        //   $unwind: {
        //     path: '$items'
        //   }
        // },
        //  {
        //   $lookup: {
        //     'from': Kpi.name, 
        //     'localField': 'items.kpiId', 
        //     'foreignField': 'originalId', 
        //     'as': 'childrenKPI'
        //   }
        // }, {
        //   '$replaceRoot': {
        //     'newRoot': {
        //       '$mergeObjects': [
        //         {
        //           '$arrayElemAt': [
        //             '$childrenKPI', 0
        //           ]
        //         }, '$$ROOT'
        //       ]
        //     }
        //   }
        // }, 
      
        //   {
        //   '$project': {
        //     'kpiId': '$originalId', 
        //     'parentKpiId': '$items.parentKpiId', 
        //     'name': '$name', 
        //     'createdAt': '$createdAt', 
        //     'createdBy': '$createdBy', 
        //     '_id': 0
        //   }
        // }, {
        //   '$merge': {
        //     'into': 'supremeHierarchy', 
        //     'on': 'kpiId'
        //   }
        // }
      ]
      
    )
    return data;
  }

  async findOneParent(id: string): Promise<KpiHierarchy> {
    const single = await this.kpiHierarchyModel.findOne({
      originalId: id,
      deletedAt: undefined,
      updatedAt: undefined,
    });
    if (!single) {
      throw new NotFoundException('OOPS! No data found, check service');
    }
    return single;
  }

}
