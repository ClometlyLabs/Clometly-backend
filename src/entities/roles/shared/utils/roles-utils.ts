import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Role, UserRole } from '../../entities';
import { User } from 'src/entities/auth/entities';

export async function assignUserRole(
  roleRepository: Repository<Role>,
  userRoleRepository: Repository<UserRole>,
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

  const userRole = userRoleRepository.create({
    user,
    role,
    entity_id: null,
  });

  await queryRunner.manager.save(userRole);
}
