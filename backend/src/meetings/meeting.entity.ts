import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { MeetingAttendee } from './meeting-attendee.entity';

export type HalfDay = 'AM' | 'PM';
export type MeetingStatus = 'normal' | 'cancelled' | 'rescheduled';

@Entity('meetings')
export class Meeting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  date: string; // 'YYYY-MM-DD'

  @Column({ type: 'text' })
  half_day: HalfDay; // 'AM' | 'PM'

  @Column({ type: 'text' })
  start_time: string; // 'HH:MM'

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text', nullable: true })
  location: string | null;

  @Column({ type: 'boolean', default: false })
  is_all_staff: boolean;

  @Column({ type: 'text', nullable: true })
  note: string | null;

  @Column({ type: 'text', default: 'normal' })
  status: MeetingStatus; // 'normal' | 'cancelled' | 'rescheduled'

  @OneToMany(() => MeetingAttendee, (attendee) => attendee.meeting, {
    cascade: true,
  })
  attendees: MeetingAttendee[];
}

