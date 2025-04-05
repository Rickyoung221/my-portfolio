"use client";
import { useTheme } from '@/context/ThemeContext';
import { Switch } from '@headlessui/react';

const ThemeSwitch = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Switch
      checked={isDarkMode}
      onChange={toggleTheme}
      className={`${
        isDarkMode 
          ? 'bg-[#073642] border-[#586e75]' 
          : 'bg-[#eee8d5] border-[#93a1a1]'
      } relative inline-flex h-8 w-24 items-center rounded-full transition-colors duration-300 focus:outline-none border-2`}
    >
      <span className="sr-only">Toggle theme</span>
      {/* Text label */}
      <span
        className={`absolute text-xs font-medium transition-all duration-300 ${
          isDarkMode 
            ? 'text-[#93a1a1] right-3' 
            : 'text-[#586e75] left-3'
        }`}
      >
        {isDarkMode ? 'Dark' : 'Light'}
      </span>
      {/* Toggle circle with icons */}
      <span
        className={`${
          isDarkMode ? 'translate-x-1' : 'translate-x-16'
        } inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 relative shadow-md`}
      >
        {/* Sun icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-3.5 w-3.5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
            isDarkMode ? 'opacity-0' : 'opacity-100'
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="#073642"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        {/* Moon icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-3.5 w-3.5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
            isDarkMode ? 'opacity-100' : 'opacity-0'
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="#073642"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </span>
    </Switch>
  );
};

export default ThemeSwitch; 