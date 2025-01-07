import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

import { Repository } from 'typeorm';

import { Role } from './entities/roles.entity';

export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async getRole(name: string, context: string) {
    const role = this.roleRepository.findOne({ where: { name, context } });
    if (!role) throw new NotFoundException('Rol no encontrado');
    return role;
  }
}
