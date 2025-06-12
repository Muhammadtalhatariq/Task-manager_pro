import { Card, Switch, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../store/themeSlice';
import { useState } from 'react';

export default function Settings() {
  const theme = useSelector(state => state.theme);
  const dispatch = useDispatch();
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    sound: false
  });

  const handleThemeChange = (checked) => {
    dispatch(toggleTheme());
    localStorage.setItem('theme', checked ? 'dark' : 'light');
    message.success(`Theme changed to ${checked ? 'dark' : 'light'} mode`);
  };
  const handleNotificationChange = (type, checked) => {
    setNotificationSettings(prev => ({
      ...prev,
      [type]: checked
    }));
    message.success(`${type.replace(/^\w/, c => c.toUpperCase())} notifications ${checked ? 'enabled' : 'disabled'}`);
  };

  return (
    <div className={`min-h-screen p-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <h1 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        Settings
      </h1>
      <Card 
        title="Appearance" 
        className="mb-6 shadow-sm"
        headStyle={{ 
          backgroundColor: theme === 'dark' ? '#1f2937' : '#f9fafb',
          color: theme === 'dark' ? 'white' : 'inherit',
          borderBottom: theme === 'dark' ? '1px solid #374151' : '1px solid #f3f4f6'
        }}
        bodyStyle={{ 
          backgroundColor: theme === 'dark' ? '#111827' : 'white',
          borderTop: theme === 'dark' ? '1px solid #374151' : '1px solid #f3f4f6'
        }}
      >
        <div className="flex justify-between items-center py-3">
          <div>
            <span className={`block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Dark Mode
            </span>
            <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              Switch between light and dark theme
            </span>
          </div>
          <Switch 
            checked={theme === 'dark'} 
            onChange={handleThemeChange}
            className={`${theme === 'dark' ? 'bg-blue-600' : 'bg-gray-300'}`}
          />
        </div>
      </Card>
      <Card 
        title="Notifications"
        className="mb-6 shadow-sm"
        headStyle={{ 
          backgroundColor: theme === 'dark' ? '#1f2937' : '#f9fafb',
          color: theme === 'dark' ? 'white' : 'inherit',
          borderBottom: theme === 'dark' ? '1px solid #374151' : '1px solid #f3f4f6'
        }}
        bodyStyle={{ 
          backgroundColor: theme === 'dark' ? '#111827' : 'white',
          borderTop: theme === 'dark' ? '1px solid #374151' : '1px solid #f3f4f6'
        }}
      >
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center py-2">
            <div>
              <span className={`block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Email Notifications
              </span>
              <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Receive notifications via email
              </span>
            </div>
            <Switch 
              checked={notificationSettings.email}
              onChange={(checked) => handleNotificationChange('email', checked)}
              className={`${notificationSettings.email ? (theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500') : 'bg-gray-300'}`}
            />
          </div>

          <div className="flex justify-between items-center py-2">
            <div>
              <span className={`block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Push Notifications
              </span>
              <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Receive push notifications
              </span>
            </div>
            <Switch 
              checked={notificationSettings.push}
              onChange={(checked) => handleNotificationChange('push', checked)}
              className={`${notificationSettings.push ? (theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500') : 'bg-gray-300'}`}
            />
          </div>
          <div className="flex justify-between items-center py-2">
            <div>
              <span className={`block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Sound Alerts
              </span>
              <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Play sound for notifications
              </span>
            </div>
            <Switch 
              checked={notificationSettings.sound}
              onChange={(checked) => handleNotificationChange('sound', checked)}
              className={`${notificationSettings.sound ? (theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500') : 'bg-gray-300'}`}
            />
          </div>
        </div>
      </Card>
      <Card 
        title="Preferences"
        className="shadow-sm"
        headStyle={{ 
          backgroundColor: theme === 'dark' ? '#1f2937' : '#f9fafb',
          color: theme === 'dark' ? 'white' : 'inherit',
          borderBottom: theme === 'dark' ? '1px solid #374151' : '1px solid #f3f4f6'
        }}
        bodyStyle={{ 
          backgroundColor: theme === 'dark' ? '#111827' : 'white',
          borderTop: theme === 'dark' ? '1px solid #374151' : '1px solid #f3f4f6'
        }}
      >
        <div className="flex justify-between items-center py-3">
          <div>
            <span className={`block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Language
            </span>
            <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              English (Default)
            </span>
          </div>
          <span className={`text-sm ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
            Change
          </span>
        </div>
      </Card>
    </div>
  );
}