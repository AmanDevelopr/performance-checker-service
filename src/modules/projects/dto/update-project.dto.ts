import { PartialType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';

import { CreateProjectDto } from './create-project.dto';
import { IsDefined, IsString } from 'class-validator';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @ApiProperty()
  @IsDefined()
  @IsString()
  projectName: string;
}
