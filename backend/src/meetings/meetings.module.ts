import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetingsService } from './meetings.service';
import { MeetingsController } from './meetings.controller';
import { Meeting } from './meeting.entity';
import { MeetingAttendee } from './meeting-attendee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Meeting, MeetingAttendee])],
  controllers: [MeetingsController],
  providers: [MeetingsService],
  exports: [MeetingsService],
})
export class MeetingsModule {}

