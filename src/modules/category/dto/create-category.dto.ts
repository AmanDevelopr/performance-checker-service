import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class CreateCategoryDto {

    @ApiProperty()
    @IsDefined()
    @IsString()
    categoryName: string;

    @ApiProperty()
    @IsDefined()
    parentId: number;
}
