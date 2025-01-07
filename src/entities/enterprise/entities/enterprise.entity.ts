import { User } from 'src/entities/auth/entities';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'enterprise' })
export class Enterprise {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  address: string;

  @Column({ type: 'varchar', length: 100 })
  phone: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column()
  responsible: string;

  @Column({ type: 'boolean' })
  status: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  //A user can have many enterprises, but an enterprise can only have one user, so we use a ManyToOne relationship
  @ManyToOne(() => User, (user) => user.enterprises)
  user: User;
}
