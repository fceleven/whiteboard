export type HalfDay = 'AM' | 'PM';
export type MeetingStatus = 'normal' | 'cancelled' | 'rescheduled';

export interface User {
  id: number;
  name: string;
}

export interface Meeting {
  id: number;
  date: string; // YYYY-MM-DD
  half_day: HalfDay;
  start_time: string; // HH:MM
  title: string;
  location: string | null;
  is_all_staff: boolean;
  note: string | null;
  status: MeetingStatus; // 'normal' | 'cancelled' | 'rescheduled'
  attendee_ids: number[];
}

export type ConflictMap = Record<number, Set<number>>; // MeetingId -> Set<UserId>

