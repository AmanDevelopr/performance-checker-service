import { Test, TestingModule } from '@nestjs/testing';
import { KpiHierarchyService } from './kpi-hierarchy.service';

describe('KpiHierarchyService', () => {
  let service: KpiHierarchyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KpiHierarchyService],
    }).compile();

    service = module.get<KpiHierarchyService>(KpiHierarchyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
