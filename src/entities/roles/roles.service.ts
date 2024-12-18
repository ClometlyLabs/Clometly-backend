import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { User } from '../auth/entities';
import { Role, UserRole } from './entities';

import { CreateUserRoleDto } from './dto/create-role-user.dto';

export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
  ) {}

  async createUserRole(roleUser: CreateUserRoleDto) {
    const user = await this.userRepository.findOne({
      where: { id: roleUser.userId },
    });
    const role = await this.roleRepository.findOne({
      where: { id: roleUser.roleId },
    });

    const userRole = this.userRoleRepository.create({
      role,
      user,
    });
    return this.userRoleRepository.save(userRole);
  }
}
