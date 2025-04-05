"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTheme } from '@/context/ThemeContext';

const TabButton = ({ children, selectTab, active }) => {
  const { isDarkMode } = useTheme();

  return (
    <motion.button
      onClick={selectTab}
      className={`px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors duration-300
                 ${active
                   ? isDarkMode
                     ? 'bg-[#586e75] text-[#fdf6e3]'
                     : 'bg-[#93a1a1] text-[#002b36]'
                   : isDarkMode
                     ? 'text-[#93a1a1] hover:bg-[#586e75]/30'
                     : 'text-[#586e75] hover:bg-[#93a1a1]/30'
                 }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

export default TabButton; 