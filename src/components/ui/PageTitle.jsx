"use client";
import { useTheme } from '@/context/ThemeContext';

const PageTitle = ({ title }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="container mx-auto px-4">
      <h2 className={`text-center text-3xl sm:text-4xl font-bold transition-colors duration-300
                    mt-8 sm:mt-12 mb-8 sm:mb-12
                    ${isDarkMode ? 'text-[#93a1a1]' : 'text-[#002b36]'}`}>
        {title}
      </h2>
    </div>
  );
};

export default PageTitle; 