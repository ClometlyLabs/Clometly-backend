import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { roles } from 'src/entities/roles/data/roles';
import { Role } from 'src/entities/roles/entities/roles.entity';
@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async roleSeed() {
    roles.forEach(async (role) => {
      if (role) await this.roleRepository.delete({ name: role.name });
      this.roleRepository.insert({
        name: role.name,
        context: role.context,
        description: role.description,
      });
    });
    return 'Roles sembrados';
  }
}
