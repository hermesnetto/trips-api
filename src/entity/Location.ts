import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';

import { Event } from './Event';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  zipcode: number;

  @Column()
  street: string;

  @Column()
  number: number;

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
}
