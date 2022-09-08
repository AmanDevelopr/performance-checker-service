import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { KpiHierarchyService } from './kpi-hierarchy.service';
import { KpiHierarchyController } from './kpi-hierarchy.controller';
import { KpiHierarchy, KpiHierarchySchema } from './schema/kpi-hierarchy.schema';
import { KpiModule } from '../kpi/kpi.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: KpiHierarchy.name, schema: KpiHierarchySchema }]),
    KpiModule,
  ],
  controllers: [KpiHierarchyController],
  providers: [KpiHierarchyService],
  exports: [KpiHierarchyService]
})
export class KpiHierarchyModule {}
