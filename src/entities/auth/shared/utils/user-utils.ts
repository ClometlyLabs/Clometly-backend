import { BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

import { User } from '../../entities';
import { CreateUserDto } from '../../dto';

import { generateRandomCode } from './string-utils';

export async function validateUserUniqueness(
  userRepository: Repository<User>,
  email: string,
  username: string,
) {
  const userExists = await userRepository.findOne({
    where: [{ email }, { username }],
  });
  if (userExists) {
    throw new BadRequestException('El usuario ya existe.');
  }
}

export async function createUser(
  userRepository: Repository<User>,
  queryRunner: any,
  createUserDto: CreateUserDto,
): Promise<User> {
  const { password } = createUserDto;
  const hashedPassword = await hash(password, 10);

  const user = userRepository.create({
    ...createUserDto,
    password: hashedPassword,
    code: generateRandomCode(6),
  });

  return queryRunner.manager.save(user);
}
