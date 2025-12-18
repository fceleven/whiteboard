import React, { useState } from 'react';
import { Table } from 'antd';
import { DndContext, DragEndEvent, DragStartEvent, DragOverlay, closestCenter } from '@dnd-kit/core';
import { Meeting, User, ConflictMap } from '../types';
import { getDateInWeek, formatDate, getWeekday } from '../utils/date';
import TimeCell from './TimeCell';
import MeetingCard from './MeetingCard';
import { updateMeeting } from '../api';

interface WeekTableProps {
  weekStart: string;
  meetings: Meeting[];
  users: User[];
  conflictMap: ConflictMap;
  showWeekend: boolean;
  onAddMeeting: (date: string, halfDay: 'AM' | 'PM') => void;
  onEditMeeting: (meeting: Meeting) => void;
  onRefresh: () => void;
}

const WeekTable: React.FC<WeekTableProps> = ({
  weekStart,
  meetings,
  users,
  conflictMap,
  showWeekend,
  onAddMeeting,
  onEditMeeting,
  onRefresh,
}) => {
  const [activeMeeting, setActiveMeeting] = useState<Meeting | null>(null);
  
  const days = [0, 1, 2, 3, 4]; // 周一到周五
  if (showWeekend) {
    days.push(5, 6); // 周六、周日
  }

  const handleDragStart = (event: DragStartEvent) => {
    const meetingId = parseInt(event.active.id as string);
    const meeting = meetings.find((m) => m.id === meetingId);
    setActiveMeeting(meeting || null);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveMeeting(null);
    const { active, over } = event;
    if (!over) return;

    const meetingId = parseInt(active.id as string);
    const targetCellId = over.id as string;

    // 解析目标单元格
    const match = targetCellId.match(/^cell-(.+)-(AM|PM)$/);
    if (!match) return;

    const [, targetDate, targetHalfDay] = match;
    const meeting = meetings.find((m) => m.id === meetingId);
    if (!meeting) return;

    // 如果位置没有变化，不更新
    if (meeting.date === targetDate && meeting.half_day === targetHalfDay) {
      return;
    }

    try {
      // 拖拽改变时间时，状态改为"改期"
      await updateMeeting(meetingId, {
        date: targetDate,
        half_day: targetHalfDay as 'AM' | 'PM',
        status: 'rescheduled',
      });
      onRefresh();
    } catch (error) {
      console.error('Failed to update meeting:', error);
    }
  };

  // 根据是否显示周末动态计算列宽
  const dateColumnWidth = showWeekend ? 100 : 120;

  const columns = [
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
      width: dateColumnWidth,
      fixed: 'left' as const,
      render: (date: string) => (
        <div style={{ 
          whiteSpace: 'nowrap', 
          overflow: 'hidden', 
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4px 0',
        }}>
          <div style={{ fontWeight: 'bold', fontSize: 14 }}>{formatDate(date)}</div>
          <div style={{ fontSize: 14, color: '#666', marginTop: 2 }}>{getWeekday(date)}</div>
        </div>
      ),
    },
    {
      title: '上午 (AM)',
      key: 'am',
      width: '50%',
      render: (_: any, record: { date: string }) => (
        <TimeCell
          date={record.date}
          halfDay="AM"
          meetings={meetings}
          users={users}
          conflictMap={conflictMap}
          allMeetings={meetings}
          onAddMeeting={() => onAddMeeting(record.date, 'AM')}
          onEditMeeting={onEditMeeting}
        />
      ),
    },
    {
      title: '下午 (PM)',
      key: 'pm',
      width: '50%',
      render: (_: any, record: { date: string }) => (
        <TimeCell
          date={record.date}
          halfDay="PM"
          meetings={meetings}
          users={users}
          conflictMap={conflictMap}
          allMeetings={meetings}
          onAddMeeting={() => onAddMeeting(record.date, 'PM')}
          onEditMeeting={onEditMeeting}
        />
      ),
    },
  ];

  const dataSource = days.map((dayOffset) => {
    const date = getDateInWeek(weekStart, dayOffset);
    return { key: date, date };
  });

  return (
    <DndContext 
      collisionDetection={closestCenter} 
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          bordered
          tableLayout="fixed"
          style={{ flex: 1, width: '100%', height: '100%' }}
        />
      </div>
      <DragOverlay dropAnimation={null}>
        {activeMeeting ? (
          <div style={{ 
            cursor: 'grabbing',
            opacity: 0.95,
            transform: 'scale(1.05) rotate(2deg)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
            borderRadius: '4px',
            pointerEvents: 'none',
          }}>
            <MeetingCard
              meeting={activeMeeting}
              users={users}
              conflictMap={conflictMap}
              allMeetings={meetings}
              onClick={() => {}}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default WeekTable;

