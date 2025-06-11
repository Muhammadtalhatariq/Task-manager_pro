import { Layout, Menu } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import {
  DashboardOutlined,
  UnorderedListOutlined,
  TeamOutlined,
  UserOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const { Sider, Content } = Layout;

export default function MainLayout() {
  return (
    <Layout className="h-screen">
      <Sider theme='light' breakpoint="lg" collapsedWidth="0">
        <div className="text-black bg-white p-4 text-xl font-bold">TaskManager Pro</div>
        <Menu
        
          mode="inline"
          items={[
            { key: '1', icon: <DashboardOutlined />, label: <Link to="/">Dashboard</Link> },
            { key: '2', icon: <UnorderedListOutlined />, label: <Link to="/tasks">Tasks</Link> },
            { key: '3', icon: <TeamOutlined />, label: <Link to="/users">Users</Link> },
            { key: '4', icon: <UserOutlined />, label: <Link to="/profile">Profile</Link> },
            { key: '5', icon: <SettingOutlined />, label: <Link to="/settings">Settings</Link> },
          ]}
        />
      </Sider>
      <Layout>
        <Content className="m-4 ">
          <div className="bg-white p-6 rounded">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}