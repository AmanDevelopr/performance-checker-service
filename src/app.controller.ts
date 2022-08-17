import { Controller, Get, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { SystemResponse } from 'response-handler';

import { AppService } from './app.service';

@ApiTags('General')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health-check')
  getHello(@Res() res: Response) {
    return res.send(
      SystemResponse.success('Health-check', this.appService.getHello()),
    );
  }
}
