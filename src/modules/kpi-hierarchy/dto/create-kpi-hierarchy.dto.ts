import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class CreateKpiHierarchyDto {
    @ApiProperty()
    @IsDefined()
    @IsString()
    kpiId: string;
}
