import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class CreateKpiDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  name: string;
}
