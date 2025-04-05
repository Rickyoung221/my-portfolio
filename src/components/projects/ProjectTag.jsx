"use client";
import React from "react";
import { useTheme } from '@/context/ThemeContext';

const ProjectTag = ({ name, onClick, isSelected }) => {
  const { isDarkMode } = useTheme();
  
  const buttonStyles = isSelected
    ? isDarkMode
      ? "text-[#fdf6e3] border-[#268bd2]"
      : "text-[#002b36] border-[#268bd2]"
    : isDarkMode
      ? "text-[#839496] border-[#586e75] hover:border-[#93a1a1]"
      : "text-[#586e75] border-[#93a1a1] hover:border-[#002b36]";

  return (
    <button
      className={`${buttonStyles} rounded-full border-2 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base cursor-pointer transition-colors`}
      onClick={() => onClick(name)}
    >
      {name}
    </button>
  );
};

export default ProjectTag;
