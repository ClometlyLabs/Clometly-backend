// import { NotFoundException } from '@nestjs/common';
// import { Repository } from 'typeorm';

// import { Role, Permission } from '../../entities';
// import { User } from 'src/entities/auth/entities';

// export async function assignPermission(
//   roleRepository: Repository<Role>,
//   permissionRepository: Repository<Permission>,
//   queryRunner: any,
//   name: string,
//   user: User,
// ) {
//   const role = await roleRepository.findOne({
//     where: { name, context: 'platform' },
//   });
//   if (!role) {
//     throw new NotFoundException(`Rol '${name}' no encontrado.`);
//   }

//   const permission = permissionRepository.create({
//     user,
//     role,
//     entity_id: null,
//   });

//   await queryRunner.manager.save(permission);
// }
