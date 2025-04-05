"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from '@/context/ThemeContext';

const variants = {
  default: { width: 0 },
  active: { width: "calc(100% - 0.5rem)" },
};

const TabButton = ({ active, selectTab, children }) => {
  const { isDarkMode } = useTheme();
  const buttonClasses = active 
    ? isDarkMode ? 'text-white' : 'text-[#002b36]'
    : isDarkMode ? 'text-[#ADB7BE]' : 'text-[#586e75]';

  return (
    <button onClick={selectTab} className="min-w-[80px] sm:min-w-[100px] px-2 sm:px-3">
      <p className={`text-sm sm:text-base font-semibold transition-colors ${buttonClasses}
                    ${isDarkMode ? 'hover:text-white' : 'hover:text-[#002b36]'}`}>
        {children}
      </p>
      <motion.div
        animate={active ? "active" : "default"}
        variants={variants}
        className={`h-1 mt-1 sm:mt-2 ${isDarkMode ? 'bg-primary-500' : 'bg-[#268bd2]'}`}
      ></motion.div>
    </button>
  );
};

export default TabButton;
