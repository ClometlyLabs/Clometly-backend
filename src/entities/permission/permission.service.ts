import { Injectable } from '@nestjs/common';

import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { User } from 'src/entities/auth/entities';
import { Role } from '../roles/entities';

import { Permission } from './entities/permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
    private readonly rolesService: RolesService,
  ) {}

  async assignPermission(
    roleRepository: Repository<Role>,
    permissionRepository: Repository<Permission>,
    queryRunner: any,
    name: string,
    user: User,
  ) {
    const role = await roleRepository.findOne({
      where: { name, context: 'platform' },
    });
    if (!role) {
      throw new NotFoundException(`Rol '${name}' no encontrado.`);
    }

    const permission = permissionRepository.create({
      user,
      role,
      entity_id: null,
    });

    await queryRunner.manager.save(permission);
  }

  async createPermission({ user, role, entity_id }) {
    const permission = this.permissionRepository.create({
      user,
      role,
      entity_id,
    });

    return this.permissionRepository.save(permission);
  }
}
