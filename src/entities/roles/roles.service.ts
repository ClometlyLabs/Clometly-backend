import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { User } from '../auth/entities';
import { Role } from './entities';

import { CreatePermissionDto } from './dto/create-permission.dto';
import { Permission } from '../permission/entities/permission.entity';
import { NotFoundException } from '@nestjs/common';

export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async getRole(name: string, context: string) {
    const role = this.roleRepository.findOne({ where: { name, context } });
    if (!role) throw new NotFoundException('Rol no encontrado');
    return role;
  }

  // async createPermission(createPermissionDto: CreatePermissionDto) {
  //   const user = await this.userRepository.findOne({
  //     where: { id: createPermissionDto.userId },
  //   });
  //   const role = await this.roleRepository.findOne({
  //     where: { id: createPermissionDto.roleId },
  //   });

  //   const permission = this.permissionRepository.create({
  //     role,
  //     user,
  //   });
  //   return this.permissionRepository.save(permission);
  // }
}
