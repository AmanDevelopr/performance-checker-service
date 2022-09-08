import { Test, TestingModule } from '@nestjs/testing';
import { KpiHierarchyController } from './kpi-hierarchy.controller';
import { KpiHierarchyService } from './kpi-hierarchy.service';

describe('KpiHierarchyController', () => {
  let controller: KpiHierarchyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KpiHierarchyController],
      providers: [KpiHierarchyService],
    }).compile();

    controller = module.get<KpiHierarchyController>(KpiHierarchyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
