"use client";
import React from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from '@/context/ThemeContext';

const HeroTextContent = () => {
  const { isDarkMode } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full col-span-12 sm:col-span-6 lg:col-span-7 text-center sm:text-left"
    >
      <h1 className={`mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight ${isDarkMode ? 'text-white' : 'text-[#002b36]'}`}>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-primary-400 to-secondary-500">
          Hello, I&apos;m{" "}
        </span>
        <br className="hidden sm:block" />
        <TypeAnimation
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
          sequence={[
            "Rick",
            1000,
            "Fullstack Developer",
            1000,
            "Mobile Developer",
            1000,
            "UI/UX Designer",
            1000,
          ]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
        />
      </h1>
      <p className={`text-sm sm:text-base lg:text-lg mb-6 max-w-[600px] mx-auto sm:mx-0 ${isDarkMode ? 'text-[#ADB7BE]' : 'text-[#586e75]'}`}>
        Welcome to see my Portfolio
      </p>
      <div className="flex justify-center sm:justify-start">
        <Link
          href="https://drive.google.com/file/d/1EylGF1FCQxpzEh8GCx9TBZQUYpvgcCeF/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-base sm:text-lg font-semibold
                     bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600
                     text-white transition-all duration-300 mt-3`}
        >
          Resume
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 sm:w-6 sm:h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
};

export default HeroTextContent; 