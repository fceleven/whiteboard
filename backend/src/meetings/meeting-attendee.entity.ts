import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Meeting } from './meeting.entity';
import { User } from '../users/user.entity';

@Entity('meeting_attendees')
export class MeetingAttendee {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Meeting, (meeting) => meeting.attendees, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'meeting_id' })
  meeting: Meeting;

  @Column({ name: 'meeting_id' })
  meeting_id: number;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  user_id: number;
}

