import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class CreateItemDto {
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
