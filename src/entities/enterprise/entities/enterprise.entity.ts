import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity({ name: 'enterprise' })
export class Enterprise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  cnpj: string;

  @Column()
  responsible: string;

  @Column()
  status: boolean;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
