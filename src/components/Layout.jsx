import { Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";
import {
  DashboardOutlined,
  UnorderedListOutlined,
  TeamOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
const { Sider, Content } = Layout;

export default function MainLayout() {
  const currentTheme = useSelector((state) => state.theme);

  return (
    <Layout className={`min-h-screen ${currentTheme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <Sider
        theme={currentTheme === 'dark' ? 'dark' : 'light'}
        breakpoint="lg"
        collapsedWidth="0"
      >
        <div className={`p-4 text-xl font-bold ${
          currentTheme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'
        }`}>
          TaskManager Pro
        </div>
        <Menu 
          theme={currentTheme === 'dark' ? 'dark' : 'light'}
          mode="inline"
          items={[
            {
              key: "1",
              icon: <DashboardOutlined />,
              label: <Link to="/">Dashboard</Link>,
            },
            {
              key: "2",
              icon: <UnorderedListOutlined />,
              label: <Link to="/tasks">Tasks</Link>,
            },
            {
              key: "3",
              icon: <TeamOutlined />,
              label: <Link to="/users">Users</Link>,
            },
            {
              key: "4",
              icon: <UserOutlined />,
              label: <Link to="/profile">Profile</Link>,
            },
            {
              key: "5",
              icon: <SettingOutlined />,
              label: <Link to="/settings">Settings</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Content className="m-4">
          <div className={`p-6 rounded ${
            currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}