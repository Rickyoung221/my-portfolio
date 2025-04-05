"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from '@/context/ThemeContext';

const HeroImage = () => {
  const { isDarkMode } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="col-span-12 sm:col-span-6 lg:col-span-5 place-self-center mt-8 sm:mt-0"
    >
      <div className={`rounded-full w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] lg:w-[400px] lg:h-[400px] relative
                      ${isDarkMode ? 'bg-[#073642]' : 'bg-[#eee8d5]'}`}>
        <Image
          src="/images/usagi-image.png"
          alt="usagi image"
          className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
          width={300}
          height={300}
          sizes="(max-width: 640px) 180px, (max-width: 1024px) 230px, 280px"
          priority
        />
      </div>
    </motion.div>
  );
};

export default HeroImage; 