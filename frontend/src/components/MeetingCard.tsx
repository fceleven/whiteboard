import React, { useState } from 'react';
import { Tag, Tooltip, Button } from 'antd';
import { ExclamationCircleOutlined, EditOutlined } from '@ant-design/icons';
import { Meeting, User, ConflictMap, MeetingStatus } from '../types';
import { hasAllStaffMeeting } from '../utils/conflict';

interface MeetingCardProps {
  meeting: Meeting;
  users: User[];
  conflictMap: ConflictMap;
  allMeetings: Meeting[];
  onClick: () => void;
  showEditButton?: boolean; // 是否显示编辑按钮，默认 true
  dragHandleRef?: (element: HTMLElement | null) => void; // 拖拽手柄引用
  dragListeners?: any; // 拖拽监听器
}

const MeetingCard: React.FC<MeetingCardProps> = ({
  meeting,
  users,
  conflictMap,
  allMeetings,
  onClick,
  showEditButton = true,
  dragHandleRef,
  dragListeners,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const conflicts = conflictMap[meeting.id] || new Set<number>();
  const hasAllStaff = hasAllStaffMeeting(
    allMeetings,
    meeting.date,
    meeting.half_day,
  );
  const showWarning = hasAllStaff && !meeting.is_all_staff;

  const getUserName = (userId: number) => {
    return users.find((u) => u.id === userId)?.name || `用户${userId}`;
  };

  const attendeeNames = meeting.attendee_ids.map((userId) => {
    const isConflict = conflicts.has(userId);
    const name = getUserName(userId);
    return { name, isConflict };
  });

  const attendeeText = attendeeNames.map((a, idx) => (
    <span
      key={idx}
      style={{ 
        color: a.isConflict ? '#ff4d4f' : 'inherit',
      }}
    >
      {a.name}
      {idx < attendeeNames.length - 1 ? '、' : ''}
    </span>
  ));

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
  };

  // 获取状态配置
  const getStatusConfig = (status: MeetingStatus) => {
    switch (status) {
      case 'normal':
        return { color: '#52c41a', bgColor: '#f6ffed', borderColor: '#b7eb8f', text: '正常' };
      case 'cancelled':
        return { color: '#ff4d4f', bgColor: '#fff1f0', borderColor: '#ffccc7', text: '取消' };
      case 'rescheduled':
        return { color: '#faad14', bgColor: '#fffbe6', borderColor: '#ffe58f', text: '改期' };
      default:
        return { color: '#52c41a', bgColor: '#f6ffed', borderColor: '#b7eb8f', text: '正常' };
    }
  };

  const statusConfig = getStatusConfig(meeting.status);

  return (
    <div
      style={{
        padding: showEditButton ? '8px 10px 8px 70px' : '8px 10px',
        marginBottom: 4,
        backgroundColor: '#fff',
        border: '1px solid #d9d9d9',
        borderRadius: 4,
        fontSize: 15,
        lineHeight: '22px',
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        minHeight: 40,
        position: 'relative',
      }}
      onMouseEnter={(e) => {
        setIsHovered(true);
        if (showEditButton) {
          e.currentTarget.style.backgroundColor = '#f5f5f5';
          e.currentTarget.style.borderColor = '#1890ff';
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(24, 144, 255, 0.2)';
        }
      }}
      onMouseLeave={(e) => {
        setIsHovered(false);
        if (showEditButton) {
          e.currentTarget.style.backgroundColor = '#fff';
          e.currentTarget.style.borderColor = '#d9d9d9';
          e.currentTarget.style.boxShadow = 'none';
        }
      }}
    >
      {/* 左侧编辑按钮 - 仅在需要时显示，不应用拖拽监听器 */}
      {showEditButton && (
      <>
        <div 
          className="edit-button-wrapper"
          style={{
            position: 'absolute',
            left: 4,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
          }}
        >
          <Tooltip title="点击编辑会议">
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={handleEditClick}
              style={{
                cursor: 'pointer',
                opacity: isHovered ? 1 : 0.6,
                transition: 'all 0.2s',
                padding: '2px 4px',
                height: '24px',
                width: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(24, 144, 255, 0.15)';
                e.currentTarget.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.opacity = isHovered ? '1' : '0.6';
              }}
            />
          </Tooltip>
        </div>

        {/* 会议状态框 - 在编辑按钮和会议名称之间 */}
        <div
          style={{
            position: 'absolute',
            left: 32,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            backgroundColor: statusConfig.bgColor,
            border: `1px solid ${statusConfig.borderColor}`,
            borderRadius: 3,
            padding: '2px 6px',
            fontSize: 12,
            fontWeight: 'bold',
            color: statusConfig.color,
            lineHeight: '16px',
            whiteSpace: 'nowrap',
          }}
        >
          {statusConfig.text}
        </div>
      </>
      )}
      {/* 拖拽区域 - 卡片主要内容 */}
      <div 
        ref={dragHandleRef}
        {...dragListeners}
        style={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        gap: 6, 
        flexWrap: 'nowrap',
        overflow: 'hidden',
        minWidth: 0,
        cursor: dragListeners ? 'grab' : 'default',
      }}>
        <strong style={{ 
          fontSize: 16,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          flexShrink: 0,
          maxWidth: '140px',
        }}>
          {meeting.title}
        </strong>
        {meeting.is_all_staff && <Tag color="blue" style={{ flexShrink: 0 }}>全体</Tag>}
        {showWarning && (
          <Tooltip title="该时间段已有全体会议">
            <ExclamationCircleOutlined style={{ color: '#ff4d4f', flexShrink: 0 }} />
          </Tooltip>
        )}
        <span style={{ 
          color: '#666',
          flexShrink: 0, 
          fontSize: 15,
        }}>
          {meeting.start_time}
        </span>
        {meeting.location && (
          <span style={{ 
            color: '#666',
            flexShrink: 1,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            minWidth: 0,
            fontSize: 14,
          }}>
            📍 {meeting.location}
          </span>
        )}
        {attendeeNames.length > 0 && (
          <span style={{ 
            color: '#666',
            flexShrink: 1,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            minWidth: 0,
            fontSize: 14,
          }}>
            👥 {attendeeText}
          </span>
        )}
      </div>
    </div>
  );
};

export default MeetingCard;
