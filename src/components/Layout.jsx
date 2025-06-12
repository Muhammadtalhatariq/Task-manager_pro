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
import { useState, useEffect } from "react";
const { Sider, Content } = Layout;

export default function MainLayout() {
  const currentTheme = useSelector((state) => state.theme);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const toggleMenu = () => {
    if (window.innerWidth < 992) {
      setMobileMenuVisible(!mobileMenuVisible);
    } else {
      setCollapsed(!collapsed);
    }
  };
  const closeMobileMenu = () => {
    if (window.innerWidth < 992) {
      setMobileMenuVisible(false);
    }
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setMobileMenuVisible(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout
      className={`min-h-screen ${
        currentTheme === "dark" ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div
        className={`lg:hidden flex items-center justify-between p-4 ${
          currentTheme === "dark"
            ? "bg-gray-800 text-white"
            : "bg-gray-100 text-black"
        }`}
      >
        <div className="text-xl font-bold">TaskManager Pro</div>
        <Button
          type="text"
          icon={
            mobileMenuVisible ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />
          }
          onClick={toggleMenu}
          className="text-current"
        />
      </div>
      <Layout hasSider className="flex flex-col lg:flex-row">
        {(mobileMenuVisible || window.innerWidth >= 992) && (
          <Sider
            theme={currentTheme === "dark" ? "dark" : "light"}
            collapsedWidth="0"
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            width={250}
            trigger={null}
            style={{
              display:
                mobileMenuVisible || window.innerWidth >= 992
                  ? "block"
                  : "none",
              zIndex: 1000,
              position: window.innerWidth < 992 ? "absolute" : "relative",
              height: "100vh",
              top: 0,
              left: 0,
            }}
          >
            <div
              className={`p-4 text-xl font-bold hidden lg:block ${
                currentTheme === "dark"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-black"
              }`}
            >
              TaskManager Pro
            </div>
            <Menu
              theme={currentTheme === "dark" ? "dark" : "light"}
              mode="inline"
              defaultSelectedKeys={["1"]}
              items={[
                {
                  key: "1",
                  icon: <DashboardOutlined />,
                  label: (
                    <Link to="/" onClick={closeMobileMenu}>
                      Dashboard
                    </Link>
                  ),
                },
                {
                  key: "2",
                  icon: <UnorderedListOutlined />,
                  label: (
                    <Link to="/tasks" onClick={closeMobileMenu}>
                      Tasks
                    </Link>
                  ),
                },
                {
                  key: "3",
                  icon: <TeamOutlined />,
                  label: (
                    <Link to="/users" onClick={closeMobileMenu}>
                      Users
                    </Link>
                  ),
                },
                {
                  key: "4",
                  icon: <UserOutlined />,
                  label: (
                    <Link to="/profile" onClick={closeMobileMenu}>
                      Profile
                    </Link>
                  ),
                },
                {
                  key: "5",
                  icon: <SettingOutlined />,
                  label: (
                    <Link to="/settings" onClick={closeMobileMenu}>
                      Settings
                    </Link>
                  ),
                },
              ]}
            />
          </Sider>
        )}
        <Layout className="flex-1">
          <Content className="m-2 lg:m-4">
            <div
              className={`p-4 lg:p-6 rounded ${
                currentTheme === "dark" ? "bg-gray-800" : "bg-white"
              }`}
              onClick={() => {
                if (mobileMenuVisible && window.innerWidth < 992) {
                  setMobileMenuVisible(false);
                }
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
