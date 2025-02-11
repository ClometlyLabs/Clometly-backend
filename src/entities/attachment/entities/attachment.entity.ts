import { Post } from 'src/entities/post/entities/post.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity('attachments')
export class Attachment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column({ type: 'enum', enum: ['Image', 'Video', 'Document'] })
  type: 'Image' | 'Video' | 'Document';

  @ManyToOne(() => Post, (post) => post.attachments, { onDelete: 'CASCADE' })
  post: Post;

  @CreateDateColumn()
  created_at: Date;
}
