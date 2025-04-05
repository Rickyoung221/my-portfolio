"use client";
import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import { useTheme } from '@/context/ThemeContext';

const Footer = () => {
  const { isDarkMode } = useTheme();

  return (
    <footer className={`footer border-t transition-colors duration-300
                       ${isDarkMode 
                         ? 'border-t-[#586e75] bg-[#00212b] text-[#93a1a1]' 
                         : 'border-t-[#93a1a1] bg-[#eee8d5] text-[#586e75]'}`}>
      <div className="container mx-auto p-6 md:p-4 lg:p-5 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Logo */}
        <div className={`transition-colors duration-300
                        ${isDarkMode ? 'text-[#93a1a1]' : 'text-[#002b36]'}`}>
          <Logo isFooter={true} />
        </div>
        {/* Footer Text */}
        <p className={`text-sm text-center md:text-left transition-colors duration-300
                      ${isDarkMode ? 'text-[#839496]' : 'text-[#586e75]'}`}>
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
