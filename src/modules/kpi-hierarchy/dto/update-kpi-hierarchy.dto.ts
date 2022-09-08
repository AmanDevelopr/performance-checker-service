import { PartialType } from '@nestjs/swagger';
import { CreateKpiHierarchyDto } from './create-kpi-hierarchy.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class UpdateKpiHierarchyDto extends PartialType(CreateKpiHierarchyDto) {
    @ApiProperty()
    @IsDefined()
    @IsString()
    kpiId: string;

    @ApiProperty()
    @IsDefined()
    @IsString()
    parentKpiId: string;
}
