import { PartialType } from '@nestjs/swagger';
import { CreateProjectDto } from './create-project.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
    @ApiProperty()
    @IsDefined()
    @IsString()
    title: string;
  
    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsString()
    techStack: string;
  }
