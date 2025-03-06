import { PartialType } from '@nestjs/mapped-types';
import { CreateClotDto } from './create-clot.dto';

export class UpdateClotDto extends PartialType(CreateClotDto) {}
