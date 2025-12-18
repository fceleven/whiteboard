import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { CalendarOutlined, TeamOutlined, EyeOutlined } from '@ant-design/icons';
import WeekViewPage from './pages/WeekViewPage';
import DisplayPage from './pages/DisplayPage';
import UsersPage from './pages/UsersPage';

const { Header, Content } = Layout;

function App() {
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <CalendarOutlined />,
      label: <Link to="/">会议管理</Link>,
    },
    {
      key: '/users',
      icon: <TeamOutlined />,
      label: <Link to="/users">人员管理</Link>,
    },
    {
      key: '/display',
      icon: <EyeOutlined />,
      label: <Link to="/display">展示模式</Link>,
    },
  ];

  return (
    <Layout style={{ height: '100vh', overflow: 'hidden' }}>
      <Header style={{ display: 'flex', alignItems: 'center', padding: '0 24px' }}>
        <div style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginRight: 40 }}>
          部门一周安排
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ overflow: 'hidden' }}>
        <Routes>
          <Route path="/" element={<WeekViewPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/display" element={<DisplayPage />} />
        </Routes>
      </Content>
    </Layout>
  );
}

export default App;

