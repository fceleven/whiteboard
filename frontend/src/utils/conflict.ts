import { Meeting, ConflictMap } from '../types';

/**
 * 计算冲突映射
 * 返回 MeetingId -> Set<UserId> 的映射，表示每个会议中冲突的参与人
 */
export function calculateConflicts(meetings: Meeting[]): ConflictMap {
  const conflictMap: ConflictMap = {};

  // 按 date + half_day 分组
  const groups = new Map<string, Meeting[]>();
  meetings.forEach((meeting) => {
    const key = `${meeting.date}-${meeting.half_day}`;
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(meeting);
  });

  // 对每个分组计算冲突
  groups.forEach((groupMeetings) => {
    // 统计每个 user_id 出现的次数
    const userCounts = new Map<number, number>();
    groupMeetings.forEach((meeting) => {
      meeting.attendee_ids.forEach((userId) => {
        userCounts.set(userId, (userCounts.get(userId) || 0) + 1);
      });
    });

    // 找出出现次数 >= 2 的用户（有冲突）
    const conflictedUsers = new Set<number>();
    userCounts.forEach((count, userId) => {
      if (count >= 2) {
        conflictedUsers.add(userId);
      }
    });

    // 为每个会议标记冲突用户
    groupMeetings.forEach((meeting) => {
      const meetingConflicts = new Set<number>();
      meeting.attendee_ids.forEach((userId) => {
        if (conflictedUsers.has(userId)) {
          meetingConflicts.add(userId);
        }
      });
      if (meetingConflicts.size > 0) {
        conflictMap[meeting.id] = meetingConflicts;
      }
    });
  });

  return conflictMap;
}

/**
 * 检查指定时间段是否有全体会议
 */
export function hasAllStaffMeeting(
  meetings: Meeting[],
  date: string,
  halfDay: 'AM' | 'PM',
): boolean {
  return meetings.some((m) => m.date === date && m.half_day === halfDay && m.is_all_staff);
}
