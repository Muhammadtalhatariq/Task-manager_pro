import { Layout, Menu, Button } from "antd";
import { Link, Outlet } from "react-router-dom";
import {
  DashboardOutlined,
  UnorderedListOutlined,
  TeamOutlined,
  UserOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useState } from "react";
const { Sider, Content } = Layout;

export default function MainLayout() {
  const currentTheme = useSelector((state) => state.theme);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileCollapsed, setMobileCollapsed] = useState(true);

  return (
    <Layout className={`min-h-screen ${currentTheme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Mobile Header */}
      <div className={`lg:hidden flex items-center justify-between p-4 ${
        currentTheme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'
      }`}>
        <div className="text-xl font-bold">TaskManager Pro</div>
        <Button
          type="text"
          icon={mobileCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setMobileCollapsed(!mobileCollapsed)}
          className="text-current"
        />
      </div>

      <Layout hasSider className="flex flex-col lg:flex-row">
        <Sider
          theme={currentTheme === 'dark' ? 'dark' : 'light'}
          breakpoint="lg"
          collapsedWidth="0"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          className={`${mobileCollapsed ? 'hidden' : 'block'} lg:block`}
          width={250}
          trigger={null}
        >
          <div className={`p-4 text-xl font-bold hidden lg:block ${
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
                label: <Link to="/" onClick={() => setMobileCollapsed(true)}>Dashboard</Link>,
              },
              {
                key: "2",
                icon: <UnorderedListOutlined />,
                label: <Link to="/tasks" onClick={() => setMobileCollapsed(true)}>Tasks</Link>,
              },
              {
                key: "3",
                icon: <TeamOutlined />,
                label: <Link to="/users" onClick={() => setMobileCollapsed(true)}>Users</Link>,
              },
              {
                key: "4",
                icon: <UserOutlined />,
                label: <Link to="/profile" onClick={() => setMobileCollapsed(true)}>Profile</Link>,
              },
              {
                key: "5",
                icon: <SettingOutlined />,
                label: <Link to="/settings" onClick={() => setMobileCollapsed(true)}>Settings</Link>,
              },
            ]}
          />
        </Sider>
        
        <Layout className="flex-1">
          <Content className="m-2 lg:m-4">
            <div className={`p-4 lg:p-6 rounded ${
              currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}>
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}