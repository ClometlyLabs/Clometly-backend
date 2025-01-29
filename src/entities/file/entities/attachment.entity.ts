import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('attachments')
export class Attachment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  file_url: string; // Ruta local del archivo en el servidor

  @Column({ type: 'enum', enum: ['Image', 'Video', 'Document'] })
  file_type: 'Image' | 'Video' | 'Document';

  @Column()
  entity_type: string; // Ej: 'Post', 'Message', 'ProfilePicture'

  @Column()
  entity_id: string; // UUID de la entidad relacionada

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
