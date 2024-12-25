import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { User } from '../auth/entities';
import { Role, Permission } from './entities';

import { CreatePermissionDto } from './dto/create-permission.dto';

export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async createPermission(createPermissionDto: CreatePermissionDto) {
    const user = await this.userRepository.findOne({
      where: { id: createPermissionDto.userId },
    });
    const role = await this.roleRepository.findOne({
      where: { id: createPermissionDto.roleId },
    });

    const permission = this.permissionRepository.create({
      role,
      user,
    });
    return this.permissionRepository.save(permission);
  }
}
