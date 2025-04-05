"use client";

import { motion } from 'framer-motion';

const Controls = ({ isDarkMode, isPlaying, onPlayPrevious, onTogglePlay, onPlayNext }) => {
  return (
    <div className="flex items-center space-x-1.5 md:space-x-2">
      {/* 上一首按钮 */}
      <motion.button
        onClick={onPlayPrevious}
        className={`p-1.5 md:p-2 rounded-full border-2 transition-colors duration-300
                   ${isDarkMode 
                     ? 'border-[#586e75] hover:border-[#93a1a1]' 
                     : 'border-[#93a1a1] hover:border-[#586e75]'}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-3.5 w-3.5 md:h-5 md:w-5 ${
            isDarkMode 
              ? 'text-[#93a1a1]' 
              : 'text-[#586e75]'
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
          />
        </svg>
      </motion.button>

      {/* 播放/暂停按钮 */}
      <motion.button
        onClick={onTogglePlay}
        className={`p-2 md:p-3 rounded-full border-2 transition-colors duration-300
                   ${isDarkMode 
                     ? 'border-[#586e75] hover:border-[#93a1a1] bg-[#586e75]/30' 
                     : 'border-[#93a1a1] hover:border-[#586e75] bg-[#93a1a1]/30'}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 md:h-7 md:w-7 ${
            isDarkMode 
              ? 'text-[#93a1a1]' 
              : 'text-[#586e75]'
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          {isPlaying ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
          )}
        </svg>
      </motion.button>

      {/* 下一首按钮 */}
      <motion.button
        onClick={onPlayNext}
        className={`p-1.5 md:p-2 rounded-full border-2 transition-colors duration-300
                   ${isDarkMode 
                     ? 'border-[#586e75] hover:border-[#93a1a1]' 
                     : 'border-[#93a1a1] hover:border-[#586e75]'}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-3.5 w-3.5 md:h-5 md:w-5 ${
            isDarkMode 
              ? 'text-[#93a1a1]' 
              : 'text-[#586e75]'
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 5l7 7-7 7M5 5l7 7-7 7"
          />
        </svg>
      </motion.button>
    </div>
  );
};

export default Controls; 