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

  @Column({ type: 'integer', nullable: true })
  age: number;

  @Column({ type: 'date', nullable: true })
  birthdate: Date;

  @Column({ type: 'integer', nullable: true })
  dni: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'boolean', default: false })
  private: boolean;

  @Column({
    type: 'text',
    default:
      'https://www.beautylabinternational.com/wp-content/uploads/2020/03/Hero-Banner-Placeholder-Light-1024x480-1.png',
  })
  profile_pic: string;

  @Column({
    type: 'text',
    default:
      'https://www.beautylabinternational.com/wp-content/uploads/2020/03/Hero-Banner-Placeholder-Light-1024x480-1.png',
  })
  banner_pic: string;

  @Column({ type: 'text', nullable: true })
  instagram_link: string;

  @Column({ type: 'text', nullable: true })
  facebook_link: string;

  @Column({ type: 'text', nullable: true })
  twitter_link: string;

  @Column({ type: 'text', nullable: true })
  linkedin_link: string;

  @Column({ type: 'text', nullable: true })
  github_link: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
