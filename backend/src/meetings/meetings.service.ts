import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Meeting } from './meeting.entity';
import { MeetingAttendee } from './meeting-attendee.entity';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { getDateInWeek } from '../common/utils/date.utils';

@Injectable()
export class MeetingsService {
  constructor(
    @InjectRepository(Meeting)
    private meetingsRepository: Repository<Meeting>,
    @InjectRepository(MeetingAttendee)
    private attendeesRepository: Repository<MeetingAttendee>,
  ) {}

  async findByWeek(weekStart: string): Promise<Meeting[]> {
    const weekEnd = getDateInWeek(weekStart, 6); // 周日
    return this.meetingsRepository.find({
      where: {
        date: Between(weekStart, weekEnd),
      },
      relations: ['attendees', 'attendees.user'],
      order: {
        date: 'ASC',
        half_day: 'ASC',
        start_time: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<Meeting> {
    const meeting = await this.meetingsRepository.findOne({
      where: { id },
      relations: ['attendees', 'attendees.user'],
    });
    if (!meeting) {
      throw new NotFoundException(`Meeting with ID ${id} not found`);
    }
    return meeting;
  }

  async create(createMeetingDto: CreateMeetingDto): Promise<Meeting> {
    const meeting = this.meetingsRepository.create({
      date: createMeetingDto.date,
      half_day: createMeetingDto.half_day,
      start_time: createMeetingDto.start_time,
      title: createMeetingDto.title,
      location: createMeetingDto.location || null,
      is_all_staff: createMeetingDto.is_all_staff || false,
      note: createMeetingDto.note || null,
      status: createMeetingDto.status || 'normal',
    });

    const savedMeeting = await this.meetingsRepository.save(meeting);

    // 创建参与人记录
    if (createMeetingDto.attendee_ids && createMeetingDto.attendee_ids.length > 0) {
      const attendees = createMeetingDto.attendee_ids.map((userId) =>
        this.attendeesRepository.create({
          meeting_id: savedMeeting.id,
          user_id: userId,
        }),
      );
      await this.attendeesRepository.save(attendees);
    }

    return this.findOne(savedMeeting.id);
  }

  async update(id: number, updateMeetingDto: UpdateMeetingDto): Promise<Meeting> {
    const meeting = await this.findOne(id);
    // findOne 已经检查了是否存在，如果不存在会抛出异常

    // 更新会议基本信息
    if (updateMeetingDto.date !== undefined) meeting.date = updateMeetingDto.date;
    if (updateMeetingDto.half_day !== undefined) meeting.half_day = updateMeetingDto.half_day;
    if (updateMeetingDto.start_time !== undefined) meeting.start_time = updateMeetingDto.start_time;
    if (updateMeetingDto.title !== undefined) meeting.title = updateMeetingDto.title;
    if (updateMeetingDto.location !== undefined) meeting.location = updateMeetingDto.location;
    if (updateMeetingDto.is_all_staff !== undefined) meeting.is_all_staff = updateMeetingDto.is_all_staff;
    if (updateMeetingDto.note !== undefined) meeting.note = updateMeetingDto.note;
    if (updateMeetingDto.status !== undefined) meeting.status = updateMeetingDto.status;

    await this.meetingsRepository.save(meeting);

    // 更新参与人：清空并重建
    if (updateMeetingDto.attendee_ids !== undefined) {
      await this.attendeesRepository.delete({ meeting_id: id });
      if (updateMeetingDto.attendee_ids.length > 0) {
        const attendees = updateMeetingDto.attendee_ids.map((userId) =>
          this.attendeesRepository.create({
            meeting_id: id,
            user_id: userId,
          }),
        );
        await this.attendeesRepository.save(attendees);
      }
    }

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    // CASCADE 会自动删除关联的 attendees
    await this.meetingsRepository.delete(id);
  }
}

