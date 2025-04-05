"use client";
import React from "react";
import Image from "next/image";
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const Logo = ({ isFooter = false }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="flex justify-center items-center">
      <div className={`relative ${
        isFooter 
          ? 'w-24 h-24 md:w-28 md:h-28' 
          : 'w-16 h-16 md:w-20 md:h-20'
      }`}>
        <Image
          src="/images/RICK_logo_vaporwave.png"
          alt="Logo"
          fill
          style={{ objectFit: "contain" }}
          className={`transition-opacity duration-300 ${isDarkMode ? 'opacity-100' : 'opacity-90'}`}
          priority
        />
      </div>
    </div>
  );
};

export default Logo;
