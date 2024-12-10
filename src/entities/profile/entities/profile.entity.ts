import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/entities/auth/entities/user.entity';

@Entity({ name: 'users_profiles' })
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  first_names: string;

  @Column({ type: 'text' })
  last_names: string;

  @Column({ type: 'integer' })
  age: number;

  @Column({ type: 'date' })
  birthdate: Date;

  @Column({ type: 'integer' })
  dni: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'boolean' })
  private: boolean;

  @Column({ type: 'text' })
  profile_pic: string;

  @Column({ type: 'text' })
  banner_pic: string;

  @Column({ type: 'text' })
  instagram_link: string;

  @Column({ type: 'text' })
  facebook_link: string;

  @Column({ type: 'text' })
  twitter_link: string;

  @Column({ type: 'text' })
  linkedin_link: string;

  @Column({ type: 'text' })
  github_link: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
