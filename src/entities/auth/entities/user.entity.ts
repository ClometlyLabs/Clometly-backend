import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Role } from './role.entity';
import { Profile } from 'src/entities/profile/entities/profile.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  @Column({ unique: true, type: 'text' })
  email: string;

  @Column({ unique: true, type: 'text' })
  username: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'boolean' })
  verified: boolean;

  @Column({ type: 'boolean' })
  banned: boolean;

  @Column({ type: 'text' })
  code: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;
}
