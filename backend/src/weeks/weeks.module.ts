import { Module } from '@nestjs/common';
import { WeeksController } from './weeks.controller';
import { MeetingsModule } from '../meetings/meetings.module';

@Module({
  imports: [MeetingsModule],
  controllers: [WeeksController],
})
export class WeeksModule {}

