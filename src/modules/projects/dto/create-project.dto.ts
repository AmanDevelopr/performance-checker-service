import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class CreateProjectDto {
    @ApiProperty()
    @IsDefined()
    @IsString()
    title: string;
  
    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    techStack: string;
  }
