import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

import { Event } from './Event';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  zipcode: string;

  @Column()
  street: string;

  @Column()
  number: number;

  @Column()
  district: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(
    type => Event,
    event => event.meetingPlace
  )
  eventsMeeting: Event[];

  @OneToMany(
    type => Event,
    event => event.destiny
  )
  eventsDestiny: Event[];

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
