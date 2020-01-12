import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinTable,
  ManyToMany,
  BeforeInsert,
  BeforeUpdate,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Location } from './Location';
import { User } from './User';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  maxPeopleCount: number;

  @Column()
  leaveDate: Date;

  @Column()
  returnDate: Date;

  @OneToOne(() => Location)
  @JoinColumn()
  meetingPlace: Location;

  @OneToOne(() => Location)
  @JoinColumn()
  destiny: Location;

  @ManyToOne(
    () => User,
    (user: User) => user.events
  )
  @JoinColumn()
  user: User;

  @ManyToMany(
    () => User,
    (user: User) => user.eventMembers
  )
  @JoinTable()
  members: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

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
