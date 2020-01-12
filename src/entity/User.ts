import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
  ManyToMany,
} from 'typeorm';
import bcrypt from 'bcryptjs';

import { Event } from './Event';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(
    () => Event,
    (event: Event) => event.user
  )
  events: Event[];

  @ManyToMany(
    () => Event,
    (event: Event) => event.members
  )
  eventMembers: Event[];

  @BeforeInsert()
  async insertPasswordHash() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  @BeforeInsert()
  async insertDates() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  async updateDates() {
    this.updatedAt = new Date();
  }
}
