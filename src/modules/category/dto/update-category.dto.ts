import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiProperty()
  @IsDefined()
  @IsString()
  categoryName: string;

  @ApiProperty()
  @IsDefined()
  parentId: number;
}
