import { Test, TestingModule } from '@nestjs/testing';

import { data, returnUser } from './stub/userControllerStub';
import { UsersController } from '../authUsers.controller';
import { UsersService } from '../authUsers.service';

const req: any = {
  user: jest.fn(() => jwt),
  query: {},
};
const jwt: any = jest.fn(() => 'vbcoenbcoughqprgqog3fy');
const logger = {
  logger: jest.fn(() => loggerConfig),
};
const loggerConfig = {
  info: jest.fn(() => ({})),
  error: jest.fn(() => ({})),
};
const res: any = {
  json: jest.fn(() => [data()]),
  redirect: jest.fn(),
  locals: jest.fn(() => logger),
};
const response: any = {
  send: jest.fn(() => [returnUser()]),
  locals: jest.fn(() => logger),
};

describe('UsercontactController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            logger: jest.fn().mockResolvedValue({}),
            error: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getlist', async () => {
    const page = 1;
    const limit = 10;
    const recieved = await controller.list(page, limit, response);
    expect(recieved).toEqual([returnUser()]);
  });
  it('googleLogin method', async () => {
    expect(controller.googleLogin()).toEqual(undefined);
  });

  it('googleLoginCallback method', async () => {
    const recieved = await controller.googleLoginCallback(req, res);
    expect(recieved).toEqual(undefined);
  });

  it('protectedResource method', async () => {
    const recieved = await controller.protectedResource();
    expect(recieved).toEqual('JWT is working!');
  });
});
