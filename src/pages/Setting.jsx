import { Card, Switch } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../store/themeSlice';

export default function Settings() {
  const theme = useSelector(state => state.theme);
  const dispatch = useDispatch();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Settings</h1>
      
      <Card title="Appearance" className="mb-4">
        <div className="flex justify-between items-center">
          <span>Dark Mode</span>
          <Switch 
            checked={theme === 'dark'} 
            onChange={() => dispatch(toggleTheme())}
          />
        </div>
      </Card>

      <Card title="Notifications">
        <div className="flex justify-between items-center mb-2">
          <span>Email Notifications</span>
          <Switch defaultChecked />
        </div>
        <div className="flex justify-between items-center">
          <span>Push Notifications</span>
          <Switch defaultChecked />
        </div>
      </Card>
    </div>
  );
}