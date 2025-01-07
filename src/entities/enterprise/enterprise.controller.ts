import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { EnterpriseService } from './enterprise.service';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';

import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('enterprise')
export class EnterpriseController {
  constructor(private readonly enterpriseService: EnterpriseService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createEnterpriseDto: CreateEnterpriseDto, @Req() req: any) {
    const { userId } = req.user;
    return this.enterpriseService.create(createEnterpriseDto, userId);
  }
}
