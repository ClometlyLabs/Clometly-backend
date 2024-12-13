import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from 'src/entities/auth/entities';
import { ValidRoles } from 'src/entities/auth/interface/ValidRoles';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async roleSeed() {
    await this.roleRepository.delete({});
    const roles = Object.values(ValidRoles).map((role) => ({ name: role }));
    await this.roleRepository.save(roles);
    return roles;
  }
}
