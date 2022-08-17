import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Projects, ProjectsSchema } from './schema/projects.schema';
import { AuthUsersModule } from '../authUsers/authUsers.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Projects.name, schema: ProjectsSchema },
    ]),
    AuthUsersModule,
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
