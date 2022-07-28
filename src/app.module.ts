import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import configurations from './config/configuration';
import { authMiddleware } from './libs/middleware/authMiddleware.service';
import { AuthMiddlewareModule } from './libs/middleware/authMiddleware.module';
import { AuthUsersModule, ProjectsModule } from './modules';

@Module({
  imports: [
    MongooseModule.forRoot(configurations.mongo),
    AuthUsersModule,
    AuthMiddlewareModule,
    ProjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(authMiddleware).forRoutes('/projects');
  }
}
