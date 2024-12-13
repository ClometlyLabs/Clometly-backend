import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { User } from './user.entity';
import { ValidRoles } from '../interface/ValidRoles';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, type: 'text' })
  name: ValidRoles;

  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @BeforeInsert()
  checkValidRole() {
    if (!Object.values(ValidRoles).includes(this.name)) {
      throw new Error(`Invalid role: ${this.name}`);
    }
  }
}
