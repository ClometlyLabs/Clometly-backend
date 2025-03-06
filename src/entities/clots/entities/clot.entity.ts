import { Profile } from 'src/entities/profile/entities/profile.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'clots' })
export class Clot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  url: string;

  @Column({ type: 'text', nullable: true })
  thumbnail_url: string | null;

  @Column({ type: 'int', nullable: true })
  duration: number; // Duración en segundos

  @Column({ type: 'text', nullable: true })
  format: string; // Ej: 'mp4', 'webm'

  @Column('simple-array')
  resolutions: string[]; // URLs de distintas resoluciones

  @ManyToOne(() => Profile, (profile) => profile.clots, { onDelete: 'CASCADE' })
  author: Profile;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
