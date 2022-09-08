import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';

const res: any = {
  send: jest.fn(() => 'Hello World!'),
  locals: jest.fn(() => logger),
};

const logger = {
  logger: jest.fn(() => loggerConfig),
};
const loggerConfig = {
  info: jest.fn(() => ({})),
  error: jest.fn(() => ({})),
};
describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello(res)).toBe('Hello World!');
    });
  });
});
