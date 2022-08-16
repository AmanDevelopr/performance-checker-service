import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { AuthUsersService } from '../authUsers/authUsers.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Projects } from './schema/projects.schema';

@Injectable()
export class ProjectsService {
  constructor(
    @Inject(AuthUsersService)
    private readonly userService: AuthUsersService,
    @InjectModel(Projects.name)
    private readonly projectsModel: mongoose.Model<Projects>,
  ) { }
  public static createObjectId() {
    return String(new mongoose.Types.ObjectId());
  }

  async softUpdate(
    originalId: string,
  ): Promise<mongoose.UpdateQuery<Projects>> {
    const data = await this.projectsModel.updateOne(
      { originalId, updatedAt: undefined, deletedAt: undefined },
      { updatedAt: Date.now() },
    );
    return data;
  }

  async softDelete(
    originalId: string,
  ): Promise<mongoose.UpdateQuery<Projects>> {
    return await this.projectsModel.updateOne(
      { originalId, updatedAt: undefined, deletedAt: undefined },
      { deletedAt: Date.now() },
    );
  }
  async create(
    createProjectDto: CreateProjectDto): Promise<Projects> {
    const createData = {
      ...createProjectDto,
    };

    const id = ProjectsService.createObjectId();
    const dataCreate = {
      originalId: id,
      ...createData,
    };
    return await this.projectsModel.create(dataCreate);

  }

  async list(
    page?: number,
    limit?: number,
  ): Promise<Projects[]> {
    if (!page) {
      page = 1;
    }
    if (!limit) {
      limit = 5;
    }
    const skip = (page - 1) * limit;
    const list = await this.projectsModel
      .find()
      .limit(limit)
      .skip(skip);
    if (!list || list.length === 0) {
      /* istanbul ignore next */
      throw new NotFoundException('Could not find projects list');
    }
    return list;
  }

  async findOne(id: string): Promise<Projects> {
    const single = await this.projectsModel.findOne({ originalId: id });
    if (!single) {
      throw new NotFoundException('OOPS! No data found, check service');
    }
    return single;
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Projects> {
    const editedData = await this.projectsModel.findOne({
      originalId: id,
      deletedAt: undefined,
      updatedAt: undefined,
    });

    if (updateProjectDto.projectName) {
      editedData.projectName = updateProjectDto.projectName;
    }

    await this.softUpdate(id);
    const newData = {
      ...updateProjectDto,
      ...editedData,
      originalId: id,
      updatedAt: undefined,
    };
    delete newData.updatedAt;
    return await this.projectsModel.create({
      ...newData,
    });
  }

  async remove(id: string): Promise<Projects> {
    return this.projectsModel.findByIdAndDelete(id);
  }
}
