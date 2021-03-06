import { Service } from 'src/service/service.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 14 })
  cpf: string;

  @Column({ length: 15 })
  phone: string;

  @OneToMany(() => Service, service => service.user)
  services: Service[];
}