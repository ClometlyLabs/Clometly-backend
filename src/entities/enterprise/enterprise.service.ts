import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { Enterprise } from './entities/enterprise.entity';
import { User } from '../auth/entities';
import { PermissionService } from '../permission/permission.service';
import { RoleService } from '../role/role.service';

@Injectable()
export class EnterpriseService {
  constructor(
    @InjectRepository(Enterprise)
    private readonly enterpriseRepository: Repository<Enterprise>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly permissionService: PermissionService,
    private readonly rolesService: RoleService,
  ) {}

  async create(createEnterpriseDto: CreateEnterpriseDto, userId: string) {
    const enterprise = this.enterpriseRepository.create({
      ...createEnterpriseDto,
      user: { id: userId },
    });

    const savedEnterprise = await this.enterpriseRepository.save(enterprise);

    const role = await this.rolesService.getRole('ADMIN', 'enterprise');

    await this.permissionService.createPermission({
      user: userId,
      role,
      entity_id: savedEnterprise.id,
    });

    return savedEnterprise;
  }
}
