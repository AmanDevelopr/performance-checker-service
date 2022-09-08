import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import configurations from './config/configuration';
import { KpiModule } from './modules/index'

@Module({
  imports: [
    MongooseModule.forRoot(configurations.mongo),
    KpiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
