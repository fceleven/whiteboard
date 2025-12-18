import React, { useEffect } from 'react';
import { Modal, Form, Input, TimePicker, Select, Checkbox, Space, Button, message as antMessage } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { Meeting, User } from '../types';

interface MeetingFormModalProps {
  open: boolean;
  mode: 'create' | 'edit';
  initialDate?: string;
  initialHalfDay?: 'AM' | 'PM';
  meeting?: Meeting;
  users: User[];
  onCancel: () => void;
  onOk: (values: any) => void;
}

const MeetingFormModal: React.FC<MeetingFormModalProps> = ({
  open,
  mode,
  initialDate,
  initialHalfDay,
  meeting,
  users,
  onCancel,
  onOk,
}) => {
  const [form] = Form.useForm();
  const [isAllStaff, setIsAllStaff] = React.useState(false);
  const [currentHalfDay, setCurrentHalfDay] = React.useState<'AM' | 'PM'>(initialHalfDay || 'AM');

  useEffect(() => {
    if (open) {
      if (mode === 'edit' && meeting) {
        const time = dayjs(meeting.start_time, 'HH:mm');
        setIsAllStaff(meeting.is_all_staff);
        setCurrentHalfDay(meeting.half_day);
        form.setFieldsValue({
          date: meeting.date,
          half_day: meeting.half_day,
          start_time: time,
          title: meeting.title,
          location: meeting.location || '',
          is_all_staff: meeting.is_all_staff,
          status: meeting.status,
          note: meeting.note || '',
          attendee_ids: meeting.attendee_ids,
        });
      } else {
        setIsAllStaff(false);
        const halfDay = initialHalfDay || 'AM';
        setCurrentHalfDay(halfDay);
        // 根据时间段设置默认时间：上午8:00，下午13:00
        const defaultTime = halfDay === 'AM' ? '08:00' : '13:00';
        form.setFieldsValue({
          date: initialDate,
          half_day: halfDay,
          start_time: dayjs(defaultTime, 'HH:mm'),
          title: '',
          location: '',
          is_all_staff: false,
          status: 'normal',
          note: '',
          attendee_ids: [],
        });
      }
    }
  }, [open, mode, meeting, initialDate, initialHalfDay, form]);

  const handleAllStaffChange = (checked: boolean) => {
    setIsAllStaff(checked);
    if (checked) {
      // Clear attendee_ids when selecting all staff
      form.setFieldsValue({ attendee_ids: [] });
    }
  };

  const handleHalfDayChange = (value: 'AM' | 'PM') => {
    setCurrentHalfDay(value);
    // 切换时间段时，自动调整开始时间
    const defaultTime = value === 'AM' ? '08:00' : '13:00';
    form.setFieldsValue({ start_time: dayjs(defaultTime, 'HH:mm') });
  };

  const handleTimeChange = (time: Dayjs | null) => {
    if (time) {
      const hour = time.hour();
      // 根据时间自动判断时间段：12点之前为上午，12点及之后为下午
      const newHalfDay = hour < 12 ? 'AM' : 'PM';
      
      // 如果时间段需要变化，自动更新
      if (newHalfDay !== currentHalfDay) {
        setCurrentHalfDay(newHalfDay);
        form.setFieldsValue({ half_day: newHalfDay });
        antMessage.info(`时间段已自动调整为${newHalfDay === 'AM' ? '上午' : '下午'}`);
      }
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const startTime = values.start_time as Dayjs;
      onOk({
        ...values,
        start_time: startTime.format('HH:mm'),
      });
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };


  return (
    <Modal
      title={mode === 'create' ? '新建会议' : '编辑会议'}
      open={open}
      onOk={handleOk}
      onCancel={onCancel}
      okText="确定"
      cancelText="取消"
      width={520}
      footer={
        <Space>
          <Button onClick={onCancel}>取消</Button>
          <Button type="primary" onClick={handleOk}>
            确定
          </Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="标题"
          rules={[{ required: true, message: '请输入会议标题' }]}
        >
          <Input placeholder="请输入会议标题" />
        </Form.Item>

        <Form.Item
          name="status"
          label="会议状态"
          rules={[{ required: true, message: '请选择会议状态' }]}
        >
          <Select placeholder="请选择会议状态">
            <Select.Option value="normal">
              <span style={{ color: '#52c41a' }}>● 正常</span>
            </Select.Option>
            <Select.Option value="cancelled">
              <span style={{ color: '#ff4d4f' }}>● 取消</span>
            </Select.Option>
            <Select.Option value="rescheduled">
              <span style={{ color: '#faad14' }}>● 改期</span>
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="date"
          label="日期"
          rules={[{ required: true, message: '请选择日期' }]}
        >
          <Input type="date" />
        </Form.Item>

        <div style={{ display: 'flex', gap: 16 }}>
          <Form.Item
            name="half_day"
            label="时间段"
            rules={[{ required: true, message: '请选择时间段' }]}
            style={{ flex: 1 }}
          >
            <Select onChange={handleHalfDayChange}>
              <Select.Option value="AM">上午 (AM)</Select.Option>
              <Select.Option value="PM">下午 (PM)</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="start_time"
            label="开始时间"
            rules={[{ required: true, message: '请选择开始时间' }]}
            style={{ flex: 1 }}
          >
            <TimePicker 
              format="HH:mm" 
              style={{ width: '100%' }}
              minuteStep={5}
              showNow={false}
              onChange={handleTimeChange}
            />
          </Form.Item>
        </div>

        <Form.Item name="location" label="地点">
          <Input placeholder="请输入会议地点" />
        </Form.Item>

        <Form.Item name="is_all_staff" valuePropName="checked">
          <Checkbox onChange={(e) => handleAllStaffChange(e.target.checked)}>
            全体人员参加
          </Checkbox>
        </Form.Item>

        <Form.Item name="attendee_ids" label="参与人">
          <Select
            mode="multiple"
            placeholder={isAllStaff ? '已选择全体人员' : '请选择参与人（可选）'}
            showSearch
            disabled={isAllStaff}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={users.map((user) => ({
              label: user.name,
              value: user.id,
            }))}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MeetingFormModal;

