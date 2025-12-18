import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Space, message } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Meeting, User } from '../types';
import { getWeekStart, getCurrentWeekStart, getDateInWeek } from '../utils/date';
import { calculateConflicts } from '../utils/conflict';
import { fetchUsers, fetchWeekMeetings, createMeeting, updateMeeting } from '../api';
import WeekTable from '../components/WeekTable';
import SettingsBar from '../components/SettingsBar';
import MeetingFormModal from '../components/MeetingFormModal';

const WeekViewPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [weekStart, setWeekStart] = useState<string>(() => {
    const weekParam = searchParams.get('week');
    return weekParam ? getWeekStart(weekParam) : getCurrentWeekStart();
  });

  // 从 localStorage 读取显示周末的状态，默认为 false
  const [showWeekend, setShowWeekend] = useState(() => {
    const saved = localStorage.getItem('showWeekend');
    return saved === 'true';
  });
  const [users, setUsers] = useState<User[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingMeeting, setEditingMeeting] = useState<Meeting | undefined>();
  const [modalInitialDate, setModalInitialDate] = useState<string>();
  const [modalInitialHalfDay, setModalInitialHalfDay] = useState<'AM' | 'PM'>();

  useEffect(() => {
    loadData();
  }, [weekStart]);

  const loadData = async () => {
    try {
      const [usersData, meetingsData] = await Promise.all([
        fetchUsers(),
        fetchWeekMeetings(weekStart),
      ]);
      setUsers(usersData);
      setMeetings(meetingsData);
    } catch (error) {
      message.error('加载数据失败');
      console.error(error);
    }
  };

  const conflictMap = calculateConflicts(meetings);

  const handlePrevWeek = () => {
    const prevWeek = getDateInWeek(weekStart, -7);
    setWeekStart(prevWeek);
    setSearchParams({ week: prevWeek });
  };

  const handleNextWeek = () => {
    const nextWeek = getDateInWeek(weekStart, 7);
    setWeekStart(nextWeek);
    setSearchParams({ week: nextWeek });
  };

  const handleAddMeeting = (date: string, halfDay: 'AM' | 'PM') => {
    setModalInitialDate(date);
    setModalInitialHalfDay(halfDay);
    setModalMode('create');
    setEditingMeeting(undefined);
    setModalOpen(true);
  };

  const handleEditMeeting = (meeting: Meeting) => {
    setEditingMeeting(meeting);
    setModalMode('edit');
    setModalOpen(true);
  };

  const handleModalOk = async (values: any) => {
    try {
      if (modalMode === 'create') {
        await createMeeting({
          ...values,
          attendee_ids: values.attendee_ids || [],
        });
        message.success('会议创建成功');
      } else if (editingMeeting) {
        await updateMeeting(editingMeeting.id, {
          ...values,
          attendee_ids: values.attendee_ids || [],
        });
        message.success('会议更新成功');
      }
      setModalOpen(false);
      loadData();
    } catch (error) {
      message.error(modalMode === 'create' ? '创建失败' : '更新失败');
      console.error(error);
    }
  };

  return (
    <div
      style={{
        padding: 24,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <div style={{ marginBottom: 16 }}>
        <Space>
          <Button icon={<LeftOutlined />} onClick={handlePrevWeek}>
            上一周
          </Button>
          <span style={{ fontSize: 16, fontWeight: 'bold' }}>
            {weekStart} ~ {getDateInWeek(weekStart, 6)}
          </span>
          <Button icon={<RightOutlined />} onClick={handleNextWeek}>
            下一周
          </Button>
        </Space>
      </div>

      <SettingsBar
        showWeekend={showWeekend}
        onShowWeekendChange={(value) => {
          setShowWeekend(value);
          // 保存到 localStorage
          localStorage.setItem('showWeekend', String(value));
        }}
      />

      <div style={{ flex: 1, overflow: 'hidden', marginTop: 16 }}>
        <WeekTable
          weekStart={weekStart}
          meetings={meetings}
          users={users}
          conflictMap={conflictMap}
          showWeekend={showWeekend}
          onAddMeeting={handleAddMeeting}
          onEditMeeting={handleEditMeeting}
          onRefresh={loadData}
        />
      </div>

      <MeetingFormModal
        open={modalOpen}
        mode={modalMode}
        initialDate={modalInitialDate}
        initialHalfDay={modalInitialHalfDay}
        meeting={editingMeeting}
        users={users}
        onCancel={() => setModalOpen(false)}
        onOk={handleModalOk}
      />
    </div>
  );
};

export default WeekViewPage;
