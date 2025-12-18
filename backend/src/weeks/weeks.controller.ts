import { Controller, Get, Param } from '@nestjs/common';
import { MeetingsService } from '../meetings/meetings.service';
import { getWeekStart } from '../common/utils/date.utils';

@Controller('weeks')
export class WeeksController {
  constructor(private readonly meetingsService: MeetingsService) {}

  @Get(':weekStart/meetings')
  async findByWeek(@Param('weekStart') weekStart: string) {
    // 确保 weekStart 是周一
    const normalizedWeekStart = getWeekStart(weekStart);
    const meetings = await this.meetingsService.findByWeek(normalizedWeekStart);
    
    // 转换为前端需要的格式
    return meetings.map((meeting) => ({
      id: meeting.id,
      date: meeting.date,
      half_day: meeting.half_day,
      start_time: meeting.start_time,
      title: meeting.title,
      location: meeting.location,
      is_all_staff: meeting.is_all_staff,
      note: meeting.note,
      status: meeting.status,
      attendee_ids: meeting.attendees?.map((a) => a.user_id) || [],
    }));
  }
}

