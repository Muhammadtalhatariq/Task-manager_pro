import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from "../store/themeSlice";
import { ConfigProvider, theme } from "antd";

export default function ThemeProvider({ children }) {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.theme);
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    dispatch(setTheme(initialTheme));
  }, [dispatch]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', currentTheme === 'dark');
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  return (
    <ConfigProvider
      theme={{
        algorithm: currentTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: currentTheme === 'dark' ? '#7c3aed' : '#6d28d9',
        },
      }}
    >
      <div className={`min-h-screen ${currentTheme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
        {children}
      </div>
    </ConfigProvider>
  );
}