import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinTable,
  ManyToMany
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

  @ManyToOne(
    type => Location,
    location => location.eventsMeeting
  )
  meetingPlace: Location;

  @ManyToOne(
    type => Location,
    location => location.eventsDestiny
  )
  destiny: Location;

  @ManyToOne(
    type => User,
    user => user.events
  )
  user: User;

  @ManyToMany(type => User)
  @JoinTable()
  attendees: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
