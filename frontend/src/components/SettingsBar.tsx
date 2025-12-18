import React from 'react';
import { Switch, Space } from 'antd';

interface SettingsBarProps {
  showWeekend: boolean;
  onShowWeekendChange: (show: boolean) => void;
}

const SettingsBar: React.FC<SettingsBarProps> = ({
  showWeekend,
  onShowWeekendChange,
}) => {
  return (
    <div style={{ marginBottom: 16, textAlign: 'right' }}>
      <Space>
        <span>显示周末：</span>
        <Switch checked={showWeekend} onChange={onShowWeekendChange} />
      </Space>
    </div>
  );
};

export default SettingsBar;

