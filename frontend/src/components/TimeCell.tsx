import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useDroppable } from '@dnd-kit/core';
import { Meeting, User, ConflictMap } from '../types';
import DraggableMeetingCard from './DraggableMeetingCard';

interface TimeCellProps {
  date: string;
  halfDay: 'AM' | 'PM';
  meetings: Meeting[];
  users: User[];
  conflictMap: ConflictMap;
  allMeetings: Meeting[];
  onAddMeeting: () => void;
  onEditMeeting: (meeting: Meeting) => void;
}

const TimeCell: React.FC<TimeCellProps> = ({
  date,
  halfDay,
  meetings,
  users,
  conflictMap,
  allMeetings,
  onAddMeeting,
  onEditMeeting,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { setNodeRef, isOver } = useDroppable({
    id: `cell-${date}-${halfDay}`,
  });

  const cellMeetings = meetings.filter((m) => m.date === date && m.half_day === halfDay);

  return (
    <div
      ref={setNodeRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 内容区域 - 可滚动 */}
      <div
        style={{
          flex: 1,
          padding: 8,
          backgroundColor: isOver ? '#e6f7ff' : 'transparent',
          overflow: 'auto',
        }}
      >
        {cellMeetings.map((meeting) => (
          <DraggableMeetingCard
            key={meeting.id}
            meeting={meeting}
            users={users}
            conflictMap={conflictMap}
            allMeetings={allMeetings}
            onClick={() => onEditMeeting(meeting)}
          />
        ))}
      </div>

      {/* 加号按钮 - 使用 CSS Grid 实现完美居中 */}
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'grid',
            placeItems: 'center',
            pointerEvents: 'none',
          }}
        >
          <div
            onClick={onAddMeeting}
            style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              backgroundColor: 'rgba(24, 144, 255, 0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.2s ease',
              pointerEvents: 'auto',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.15)';
              e.currentTarget.style.backgroundColor = 'rgba(64, 169, 255, 0.95)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.backgroundColor = 'rgba(24, 144, 255, 0.9)';
            }}
          >
            <PlusOutlined style={{ color: 'white', fontSize: 12 }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeCell;
