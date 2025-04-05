"use client";
import React, { memo } from "react";
import { CodeBracketIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from '@/context/ThemeContext';

const ProjectCard = memo(({ imgUrl, title, description, gitUrl }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`h-[400px] rounded-xl overflow-hidden transition-all duration-300 hover:scale-105
                    ${isDarkMode 
                      ? 'bg-[#073642] border border-[#586e75]' 
                      : 'bg-[#eee8d5] border border-[#93a1a1]'}`}>
      <div className="h-48 sm:h-52 md:h-52 relative group">
        <Image
          src={imgUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={75}
          priority={false}
        />
        <div className={`overlay items-center justify-center absolute top-0 left-0 w-full h-full 
                        ${isDarkMode ? 'bg-[#073642]' : 'bg-[#eee8d5]'}
                        bg-opacity-0 hidden group-hover:flex group-hover:bg-opacity-80 
                        transition-all duration-500`}>
          <Link
            href={gitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`h-12 w-12 sm:h-14 sm:w-14 border-2 relative rounded-full 
                       ${isDarkMode 
                         ? 'border-[#93a1a1] hover:border-[#fdf6e3]' 
                         : 'border-[#93a1a1] hover:border-[#002b36]'} 
                       group/link`}
          >
            <CodeBracketIcon className={`h-8 w-8 sm:h-10 sm:w-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer 
                                       ${isDarkMode 
                                         ? 'text-[#93a1a1] group-hover/link:text-[#fdf6e3]' 
                                         : 'text-[#93a1a1] group-hover/link:text-[#002b36]'}`} />
          </Link>
        </div>
      </div>
      <div className="p-4">
        <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-[#002b36]'}`}>
          {title}
        </h3>
        <p className={`text-sm ${isDarkMode ? 'text-[#93a1a1]' : 'text-[#586e75]'}`}>
          {description}
        </p>
      </div>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
