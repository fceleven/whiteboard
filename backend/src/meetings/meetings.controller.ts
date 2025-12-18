import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { MeetingsService } from './meetings.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';

@Controller('meetings')
export class MeetingsController {
  constructor(private readonly meetingsService: MeetingsService) {}

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const meeting = await this.meetingsService.findOne(id);
    return {
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
    };
  }

  @Post()
  async create(@Body() createMeetingDto: CreateMeetingDto) {
    const meeting = await this.meetingsService.create(createMeetingDto);
    return {
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
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMeetingDto: UpdateMeetingDto,
  ) {
    const meeting = await this.meetingsService.update(id, updateMeetingDto);
    return {
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
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.meetingsService.remove(id);
    return { success: true };
  }
}

