import { Test, TestingModule } from '@nestjs/testing';

import { AppService } from './app.service';

describe('UsercontactService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('get method test', async () => {
    const given = service.getHello();
    expect(given).toEqual('Hello World!');
  });
});
