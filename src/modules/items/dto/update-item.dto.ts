import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

import { CreateItemDto } from './create-item.dto';

export class UpdateItemDto extends PartialType(CreateItemDto) {
  @ApiProperty()
  @IsDefined()
  @IsString()
  item: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  subCategory: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  category: string;
}
