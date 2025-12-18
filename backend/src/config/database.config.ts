import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from '../users/user.entity';
import { Meeting } from '../meetings/meeting.entity';
import { MeetingAttendee } from '../meetings/meeting-attendee.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: process.env.DATABASE_PATH || './db.sqlite',
  entities: [User, Meeting, MeetingAttendee],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV === 'development',
  migrations: ['src/migrations/**/*.ts'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

