import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class CreateProjectDto {

  @ApiProperty()
  @IsDefined()
  @IsString()
  projectName: string;

}
