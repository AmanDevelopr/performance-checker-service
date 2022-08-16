import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateItemDto } from './create-item.dto';
import { IsDefined, IsString } from 'class-validator';

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
