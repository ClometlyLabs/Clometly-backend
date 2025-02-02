import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { User } from 'src/entities/auth/entities/user.entity';
import { Post } from 'src/entities/post/entities/post.entity';

@Entity({ name: 'users_profiles' })
export class Profile {
  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn()
  user: User;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  first_names: string;

  @Column({ type: 'text' })
  last_names: string;

  @Column({ type: 'integer', nullable: true })
  age: number;

  @Column({ type: 'date', nullable: true })
  birthdate: Date;

  @Column({ type: 'integer', nullable: true })
  dni: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  phone: string;

  @Column({ type: 'boolean', default: false })
  private: boolean;

  @Column({
    type: 'text',
    default:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png',
  })
  profile_pic: string;

  @Column({
    type: 'text',
    default:
      'https://www.beautylabinternational.com/wp-content/uploads/2020/03/Hero-Banner-Placeholder-Light-1024x480-1.png',
  })
  banner_pic: string;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
