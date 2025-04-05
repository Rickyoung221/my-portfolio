"use client";
import React, { useRef } from 'react';
import Interests from './Interest';
import { useTheme } from '@/context/ThemeContext';

const HobbiesPage = () => {
  const containerRef = useRef(null);
  const { isDarkMode } = useTheme();

  return (
    <main 
      ref={containerRef}
      className={`
        w-full 
        min-h-[calc(100vh-64px)] 
        relative 
        ${isDarkMode ? 'bg-[#002b36]' : 'bg-[#fdf6e3]'}
      `}
    >
      <Interests containerRef={containerRef} />
    </main>
  );
};

export default HobbiesPage; 