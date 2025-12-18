import React from 'react';
import { Tag } from 'antd';
import { ClockCircleOutlined, EnvironmentOutlined, TeamOutlined, CheckCircleOutlined, CloseCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { Meeting, User, MeetingStatus } from '../types';

interface DisplayMeetingCardProps {
  meeting: Meeting;
  users: User[];
}

const DisplayMeetingCard: React.FC<DisplayMeetingCardProps> = ({ meeting, users }) => {
  const getUserName = (userId: number) => {
    return users.find((u) => u.id === userId)?.name || `用户${userId}`;
  };

  const attendeeNames = meeting.attendee_ids.map(getUserName).join('、');

  // 获取状态配置 - 适配暗色背景
  const getStatusConfig = (status: MeetingStatus) => {
    switch (status) {
      case 'normal':
        return { 
          color: '#52c41a', 
          bgColor: 'rgba(82, 196, 26, 0.15)', 
          borderColor: '#52c41a',
          text: '正常',
          icon: <CheckCircleOutlined />
        };
      case 'cancelled':
        return { 
          color: '#ff4d4f', 
          bgColor: 'rgba(255, 77, 79, 0.15)', 
          borderColor: '#ff4d4f',
          text: '取消',
          icon: <CloseCircleOutlined />
        };
      case 'rescheduled':
        return { 
          color: '#faad14', 
          bgColor: 'rgba(250, 173, 20, 0.15)', 
          borderColor: '#faad14',
          text: '改期',
          icon: <SyncOutlined />
        };
      default:
        return { 
          color: '#52c41a', 
          bgColor: 'rgba(82, 196, 26, 0.15)', 
          borderColor: '#52c41a',
          text: '正常',
          icon: <CheckCircleOutlined />
        };
    }
  };

  const statusConfig = getStatusConfig(meeting.status);

  return (
    <div
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        border: `2px solid ${statusConfig.borderColor}`,
        borderRadius: 8,
        padding: '10px 14px',
        marginBottom: 8,
        position: 'relative',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        boxShadow: `0 2px 8px rgba(0, 0, 0, 0.15)`,
      }}
    >
      {/* 状态标识 - 左上角 */}
      <div
        style={{
          position: 'absolute',
          top: -1,
          right: -1,
          backgroundColor: statusConfig.color,
          color: '#fff',
          padding: '4px 12px',
          borderRadius: '0 10px 0 10px',
          fontSize: 12,
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}
      >
        {statusConfig.icon}
        {statusConfig.text}
      </div>

      {/* 会议标题 - 大而突出 */}
      <div
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: '#fff',
          marginBottom: 8,
          lineHeight: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        {meeting.title}
        {meeting.is_all_staff && (
          <Tag color="blue" style={{ fontSize: 12, padding: '1px 6px' }}>
            全体
          </Tag>
        )}
      </div>

      {/* 详细信息 - 紧凑布局 */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          color: 'rgba(255, 255, 255, 0.85)',
          fontSize: 14,
        }}
      >
        {/* 时间 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <ClockCircleOutlined style={{ fontSize: 16, color: '#1890ff' }} />
          <span>{meeting.start_time}</span>
        </div>

        {/* 地点 */}
        {meeting.location && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <EnvironmentOutlined style={{ fontSize: 16, color: '#52c41a' }} />
            <span>{meeting.location}</span>
          </div>
        )}

        {/* 参与人 */}
        {attendeeNames && !meeting.is_all_staff && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, minWidth: 0 }}>
            <TeamOutlined style={{ fontSize: 16, color: '#faad14' }} />
            <span
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {attendeeNames}
            </span>
          </div>
        )}
      </div>

      {/* 备注 - 只在有备注时显示 */}
      {meeting.note && (
        <div
          style={{
            marginTop: 8,
            paddingTop: 8,
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'rgba(255, 255, 255, 0.65)',
            fontSize: 12,
            fontStyle: 'italic',
          }}
        >
          💡 {meeting.note}
        </div>
      )}

      {/* 装饰性渐变条 */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 4,
          background: `linear-gradient(to bottom, ${statusConfig.color}, transparent)`,
          borderRadius: '10px 0 0 10px',
        }}
      />
    </div>
  );
};

export default DisplayMeetingCard;

