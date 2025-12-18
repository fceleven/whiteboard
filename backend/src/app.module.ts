import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { MeetingsModule } from './meetings/meetings.module';
import { WeeksModule } from './weeks/weeks.module';
import { User } from './users/user.entity';
import { Meeting } from './meetings/meeting.entity';
import { MeetingAttendee } from './meetings/meeting-attendee.entity';

const envBool = (value: string | undefined, fallback: boolean) => {
  if (value === undefined) return fallback;
  return value.toLowerCase() === 'true';
};

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DATABASE_PATH || './db.sqlite',
      entities: [User, Meeting, MeetingAttendee],
      synchronize: envBool(process.env.TYPEORM_SYNCHRONIZE, process.env.NODE_ENV !== 'production'),
      logging: envBool(process.env.TYPEORM_LOGGING, process.env.NODE_ENV === 'development'),
    }),
    UsersModule,
    MeetingsModule,
    WeeksModule,
  ],
})
export class AppModule {}

