import { Injectable } from '@nestjs/common';

import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { User } from 'src/entities/auth/entities';
import { Role } from '../role/entities/roles.entity';

import { Permission } from './entities/permission.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
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
      entity: null,
    });

    await queryRunner.manager.save(permission);
  }

  async createPermission({ user, role, entity_id }) {
    const permission = this.permissionRepository.create({
      user,
      role,
      entity: entity_id,
    });

    return this.permissionRepository.save(permission);
  }
}
