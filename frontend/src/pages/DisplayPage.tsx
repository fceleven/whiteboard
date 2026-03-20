import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { Meeting, User } from '../types';
import { getCurrentWeekStart, getDateInWeek, formatDate, getWeekday } from '../utils/date';
import { fetchUsers, fetchWeekMeetings } from '../api';
import DisplayMeetingCard from '../components/DisplayMeetingCard';

const DisplayPage: React.FC = () => {
  const [weekStart] = useState(getCurrentWeekStart());
  const [users, setUsers] = useState<User[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(false);
  
  // 从 URL 参数读取是否显示周末，如果没有 URL 参数，则从 localStorage 读取
  const urlParams = new URLSearchParams(window.location.search);
  const weekendParam = urlParams.get('weekend');
  const showWeekend = weekendParam !== null 
    ? weekendParam === 'true'  // 优先使用 URL 参数
    : localStorage.getItem('showWeekend') === 'true';  // 其次使用 localStorage

  useEffect(() => {
    loadData();
    // 每5分钟自动刷新
    const interval = setInterval(loadData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [usersData, meetingsData] = await Promise.all([
        fetchUsers(),
        fetchWeekMeetings(weekStart),
      ]);
      setUsers(usersData);
      setMeetings(meetingsData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  // 根据是否显示周末动态设置天数
  const days = showWeekend ? [0, 1, 2, 3, 4, 5, 6] : [0, 1, 2, 3, 4];

  // 响应式计算：日期列固定宽度，根据是否显示周末调整
  const dateColumnWidth = showWeekend ? 120 : 160;

  const columns = [
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
      width: dateColumnWidth,
      fixed: 'left' as const,
      render: (date: string) => (
        <div style={{ 
          height: '100%',
          fontSize: 18, 
          fontWeight: 'bold', 
          whiteSpace: 'nowrap', 
          overflow: 'hidden',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, rgba(24, 144, 255, 0.1) 0%, rgba(82, 196, 26, 0.1) 100%)',
        }}>
          <div style={{ color: '#fff' }}>{formatDate(date)}</div>
          <div style={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.65)', marginTop: 2 }}>
            {getWeekday(date)}
          </div>
        </div>
      ),
    },
    {
      title: (
        <div style={{ 
          fontSize: 18, 
          fontWeight: 'bold',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
        }}>
          🌅 上午 (AM)
        </div>
      ),
      key: 'am',
      width: '50%',
      render: (_: any, record: { date: string }) => {
        const cellMeetings = meetings.filter(
          (m) => m.date === record.date && m.half_day === 'AM',
        );
        return (
          <div style={{ 
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: '12px',
            background: 'rgba(0, 0, 0, 0.2)',
          }}>
            {cellMeetings.length > 0 ? (
              cellMeetings.map((meeting) => (
                <DisplayMeetingCard
                  key={meeting.id}
                  meeting={meeting}
                  users={users}
                />
              ))
            ) : (
              <div style={{ 
                color: 'rgba(255, 255, 255, 0.3)', 
                textAlign: 'center', 
                fontSize: 16,
                padding: '20px 0',
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                暂无会议安排
              </div>
            )}
          </div>
        );
      },
    },
    {
      title: (
        <div style={{ 
          fontSize: 18, 
          fontWeight: 'bold',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
        }}>
          🌆 下午 (PM)
        </div>
      ),
      key: 'pm',
      width: '50%',
      render: (_: any, record: { date: string }) => {
        const cellMeetings = meetings.filter(
          (m) => m.date === record.date && m.half_day === 'PM',
        );
        return (
          <div style={{ 
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: '12px',
            background: 'rgba(0, 0, 0, 0.2)',
          }}>
            {cellMeetings.length > 0 ? (
              cellMeetings.map((meeting) => (
                <DisplayMeetingCard
                  key={meeting.id}
                  meeting={meeting}
                  users={users}
                />
              ))
            ) : (
              <div style={{ 
                color: 'rgba(255, 255, 255, 0.3)', 
                textAlign: 'center', 
                fontSize: 16,
                padding: '20px 0',
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                暂无会议安排
              </div>
            )}
          </div>
        );
      },
    },
  ];

  const dataSource = days.map((dayOffset) => {
    const date = getDateInWeek(weekStart, dayOffset);
    return { key: date, date };
  });

  return (
    <div
      className="display-page-container"
      style={{
        padding: 20,
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #1e3c72 100%)',
        color: '#fff',
        height: '100vh',
        height: '100dvh', // 动态视口高度，适配移动端
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        WebkitOverflowScrolling: 'touch', // iOS 平滑滚动
      }}
    >
      <div style={{
        marginBottom: 16,
        textAlign: 'center',
        flexShrink: 0,
        background: 'rgba(255, 255, 255, 0.05)',
        background: '#1a1a1a', // 安卓降级方案
        padding: '12px 20px',
        borderRadius: '8px',
      }}>
        <h1 style={{ 
          fontSize: 32, 
          color: '#fff', 
          marginBottom: 4,
          fontWeight: 'bold',
          textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
        }}>
          📅 部门周会议安排
        </h1>
        <div style={{ 
          fontSize: 18, 
          color: 'rgba(255, 255, 255, 0.85)',
          fontWeight: '500',
        }}>
          {weekStart} ~ {getDateInWeek(weekStart, 6)}
        </div>
      </div>

      <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column' }} className={`ant-table-dark display-mode ${showWeekend ? 'weekend-mode' : 'weekday-mode'}`}>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          bordered
          loading={loading}
          tableLayout="fixed"
          scroll={{ x: true, y: '100%' }} // 安卓平板滚动支持
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </div>
    </div>
  );
};

export default DisplayPage;

