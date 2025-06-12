// src/components/ThemeProvider.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTheme } from '../store/themeSlice';

export default function ThemeProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check localStorage for saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    dispatch(setTheme(savedTheme));
    
    // Apply theme class to body
    document.body.className = savedTheme;
  }, [dispatch]);

  return children;
}