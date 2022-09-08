import { Module } from '@nestjs/common';
import { KpiService } from './kpi.service';
import { KpiController } from './kpi.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { KpiSchema, Kpi } from './schema/kpi.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Kpi.name, schema: KpiSchema }]),
  ],
  controllers: [KpiController],
  providers: [KpiService]
})
export class KpiModule {}
