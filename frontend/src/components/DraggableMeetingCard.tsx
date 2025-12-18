import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import MeetingCard from './MeetingCard';
import { Meeting, User, ConflictMap } from '../types';

interface DraggableMeetingCardProps {
  meeting: Meeting;
  users: User[];
  conflictMap: ConflictMap;
  allMeetings: Meeting[];
  onClick: () => void;
}

const DraggableMeetingCard: React.FC<DraggableMeetingCardProps> = ({
  meeting,
  users,
  conflictMap,
  allMeetings,
  onClick,
}) => {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, isDragging } = useDraggable({
    id: meeting.id.toString(),
  });

  const style: React.CSSProperties = {
    opacity: isDragging ? 0.3 : 1,
    transition: 'opacity 0.2s ease',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <MeetingCard
        meeting={meeting}
        users={users}
        conflictMap={conflictMap}
        allMeetings={allMeetings}
        onClick={onClick}
        dragHandleRef={setActivatorNodeRef}
        dragListeners={listeners}
      />
    </div>
  );
};

export default DraggableMeetingCard;
