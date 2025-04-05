"use client";
import { useTheme } from '@/context/ThemeContext';

const SectionTitle = ({ title }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <h2 className={`text-center text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 transition-colors duration-300
                  ${isDarkMode ? 'text-[#93a1a1]' : 'text-[#002b36]'}`}>
      {title}
    </h2>
  );
};

export default SectionTitle; 