import { PartialType } from '@nestjs/swagger';
import { CreateKpiDto } from './create-kpi.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class UpdateKpiDto extends PartialType(CreateKpiDto) {
    @ApiProperty()
    @IsDefined()
    @IsString()
    item: string;
}
