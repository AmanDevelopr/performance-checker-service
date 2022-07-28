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
    originalId: string,
    createProjectDto: CreateProjectDto): Promise<Projects> {
    const data = await this.userService.findOne(originalId);
    const createData = {
      userId: data.originalId,
      title: createProjectDto.title,
      description: createProjectDto.description,
      techStack: createProjectDto.techStack,
    };

    const check = await this.projectsModel.aggregate([
      {
        $match: {
          userId: data.originalId,
          deletedAt: undefined,
          updatedAt: undefined,
        },
      },
    ]);

    if (!check || check.length == 0) {
      const id = ProjectsService.createObjectId();
      return await this.projectsModel.create({
        originalId: id,
        ...createData,
      });
    } else {
      /* istanbul ignore next */
      throw new NotFoundException('OOPS! User is already present');
    }
  }

  async list(
    id: string,
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
      .find({ userId: id })
      .limit(limit)
      .skip(skip);
    if (!list || list.length === 0) {
       /* istanbul ignore next */
      throw new NotFoundException('Could not find projects list');
    }
    return list;
  }

  async findOne(id: string): Promise<Projects> {
    const single = await this.projectsModel.findById(id);
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

    if (updateProjectDto.title) {
      editedData.title = updateProjectDto.title;
    }
    if (updateProjectDto.description) {
      editedData.description = updateProjectDto.description;
    }

    if (updateProjectDto.techStack) {
      editedData.techStack = updateProjectDto.techStack;
    }
    await this.softUpdate(id);
    const newData = {
      ...updateProjectDto,
      ...editedData,
      originalId: id,
      userId: editedData.userId,
      title: editedData.title,
      description: editedData.description,
      version: editedData.version + 1,
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
