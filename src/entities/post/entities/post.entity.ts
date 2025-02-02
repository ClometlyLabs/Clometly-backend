import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Profile } from 'src/entities/profile/entities/profile.entity';

import { Attachment } from 'src/entities/attachment/entities/attachment.entity';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => Profile, (profile) => profile.posts)
  author: Profile;

  @OneToMany(() => Attachment, (attachment) => attachment.post, {
    cascade: true,
  })
  attachments: Attachment[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
