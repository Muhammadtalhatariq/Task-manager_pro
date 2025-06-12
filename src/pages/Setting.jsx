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
    message.success(`${type.charAt(0).toUpperCase() + type.slice(1)} notifications ${checked ? 'enabled' : 'disabled'}`);
  };

  return (
    <div className={`min-h-screen p-4 md:p-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <h1 className={`text-xl md:text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        Settings
      </h1>
      
      <Card 
        title="Appearance" 
        className="mb-6 w-full max-w-3xl mx-auto"
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-2">
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
        className="mb-6 w-full max-w-3xl mx-auto"
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
          {Object.entries(notificationSettings).map(([key, value]) => (
            <div key={key} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 p-2">
              <div>
                <span className={`block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {key.charAt(0).toUpperCase() + key.slice(1)} Notifications
                </span>
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {key === 'email' ? 'Receive notifications via email' : 
                   key === 'push' ? 'Receive push notifications' : 
                   'Play sound for notifications'}
                </span>
              </div>
              <Switch 
                checked={value}
                onChange={(checked) => handleNotificationChange(key, checked)}
                className={`${value ? (theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500') : 'bg-gray-300'}`}
              />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}