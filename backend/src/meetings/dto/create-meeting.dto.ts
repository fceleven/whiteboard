import {
  IsString,
  IsBoolean,
  IsOptional,
  IsArray,
  IsNumber,
  Matches,
  IsIn,
} from 'class-validator';

export class CreateMeetingDto {
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'date must be in YYYY-MM-DD format' })
  date: string;

  @IsString()
  @IsIn(['AM', 'PM'])
  half_day: 'AM' | 'PM';

  @IsString()
  @Matches(/^\d{2}:\d{2}$/, { message: 'start_time must be in HH:MM format' })
  start_time: string;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  location?: string | null;

  @IsBoolean()
  @IsOptional()
  is_all_staff?: boolean;

  @IsString()
  @IsOptional()
  note?: string | null;

  @IsString()
  @IsIn(['normal', 'cancelled', 'rescheduled'])
  @IsOptional()
  status?: 'normal' | 'cancelled' | 'rescheduled';

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  attendee_ids?: number[];
}

