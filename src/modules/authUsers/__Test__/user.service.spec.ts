import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { UsersService } from '../authUsers.service';
import { User } from '../schemas/authUsers.schema';
import { returnUser } from './stub/userServiceStub';

describe('UsercontactService', () => {
  let service: UsersService;

  const userModel = {
    findOneAndUpdate: jest.fn().mockResolvedValue([returnUser()]),
    find: jest.fn().mockResolvedValue([returnUser()]),
    exec: jest.fn(),
    findOne: jest.fn().mockImplementation(() => ({
      exec: jest.fn().mockResolvedValue([returnUser()]),
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: userModel,
        },
        UsersService,
        {
          provide: 'google',
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create method test', async () => {
    const given = await service.createGoogleUser(returnUser());
    expect(given).toEqual([returnUser()]);
  });

  it('get method test', async () => {
    const given = await service.find();
    expect(given).toEqual([returnUser()]);
  });
});
