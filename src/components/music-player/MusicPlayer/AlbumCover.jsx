"use client";

import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';

const AlbumCover = ({ currentCover, isDarkMode, isPlaying }) => {
  const controls = useAnimation();
  const rotationRef = useRef(0);
  const startTimeRef = useRef(null);

  // 重置旋转状态
  const resetRotation = () => {
    rotationRef.current = 0;
    startTimeRef.current = null;
    controls.set({ rotate: 0 });
  };

  // 监听歌曲切换
  useEffect(() => {
    resetRotation();
  }, [currentCover]);

  useEffect(() => {
    let animationFrameId;

    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      
      // 每4秒转360度
      rotationRef.current = (elapsed / 4000) * 360;
      
      controls.set({
        rotate: rotationRef.current
      });

      if (isPlaying) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    if (isPlaying) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isPlaying, controls]);

  return (
    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 relative flex-shrink-0 order-first">
      {/* 黑胶外圈 */}
      <div className="absolute inset-0 rounded-full border-[10px] sm:border-[12px] border-black">
        {currentCover ? (
          <motion.div
            className="w-full h-full rounded-full overflow-hidden relative"
            initial={{ rotate: 0 }}
            animate={controls}
            transition={{
              type: "tween",
              duration: 0
            }}
          >
            <Image
              src={currentCover}
              alt="Album Cover"
              fill
              className="object-cover rounded-full"
            />
          </motion.div>
        ) : (
          <div className={`w-full h-full flex items-center justify-center rounded-full ${
            isDarkMode ? 'bg-[#586e75]' : 'bg-[#93a1a1]'
          }`}>
            <div className={`w-[60%] h-[60%] rounded-full flex items-center justify-center ${
              isDarkMode ? 'bg-[#073642]' : 'bg-[#002b36]'
            }`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 ${
                  isDarkMode ? 'text-[#93a1a1]' : 'text-[#93a1a1]'
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlbumCover; 