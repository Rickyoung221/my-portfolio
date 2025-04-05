"use client";
import React, { useState } from "react";
import {
  FaGraduationCap,
  FaBriefcase,
  FaAward,
  FaLightbulb,
} from "react-icons/fa";
import { useTheme } from '@/context/ThemeContext';
import ExperienceLogo from "@/components/experience/ExperienceLogo";

const timelineData = [
  {
    id: 1,
    date: "2024",
    title: "Graduated B.S. from UCLA",
    icon: FaGraduationCap,
    color: "bg-[#268bd2]", // Solarized blue
  },
  {
    id: 2,
    date: "2024",
    title: "First Job",
    icon: FaBriefcase,
    color: "bg-[#859900]", // Solarized green
  },
  {
    id: 3,
    date: "2021",
    title: "SWE Internship at Alibaba",
    icon: FaAward,
    color: "bg-[#b58900]", // Solarized yellow
  },
  {
    id: 4,
    date: "2022",
    title: "SWE Internship at Student Medicover",
    icon: FaLightbulb,
    color: "bg-[#6c71c4]", // Solarized violet
  },
];

const Timeline = () => {
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const { isDarkMode } = useTheme();

  const sortedTimelineData = [...timelineData].sort(
    (a, b) => parseInt(b.date) - parseInt(a.date)
  );

  const handleMilestoneClick = (milestone) => {
    setSelectedMilestone(milestone);
  };

  const closeModal = () => {
    setSelectedMilestone(null);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="relative wrap overflow-hidden p-10 h-full">
        <div className={`border-2-2 absolute border-opacity-20 h-full border left-1/2 transition-colors duration-300
                        ${isDarkMode ? 'border-[#586e75]' : 'border-[#93a1a1]'}`}></div>
        {sortedTimelineData.map((item, index) => (
          <div key={index} className="relative pl-8 sm:pl-32 py-6 group">
            {/* 时间线指示器 */}
            <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:my-6 before:mt-8 dark:before:bg-slate-500">
              <div className="absolute left-0 sm:left-[8.5rem] flex items-center justify-center w-4 h-4 rounded-full bg-slate-300 dark:bg-slate-500 sm:mb-0 -translate-x-1/2">
                <div className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400"></div>
              </div>
            </div>
            {/* 内容 */}
            <div className="flex flex-col sm:flex-row items-start mb-1">
              <div className="sm:min-w-[8rem] sm:text-right sm:mr-8">
                <time className="text-sm font-semibold text-slate-600 dark:text-slate-400">{item.date}</time>
              </div>
              <div className="flex-grow">
                <div className="flex items-center mb-2">
                  <div className="mr-3">
                    <ExperienceLogo
                      src={item.logo}
                      alt={`${item.location} logo`}
                    />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-slate-900 dark:text-slate-200">{item.title}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">{item.location}</div>
                  </div>
                </div>
                <div className="text-slate-700 dark:text-slate-300">{item.description}</div>
                {item.details && (
                  <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">{item.details}</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedMilestone && (
        <div
          className={`fixed inset-0 overflow-y-auto h-full w-full z-50 transition-colors duration-300
                     ${isDarkMode ? 'bg-[#002b36]/50' : 'bg-[#073642]/30'}`}
          onClick={closeModal}
        >
          <div
            className={`relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md transition-colors duration-300
                       ${isDarkMode 
                         ? 'bg-[#002b36] border-[#073642]' 
                         : 'bg-[#eee8d5] border-[#93a1a1]'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mt-3 text-center">
              <selectedMilestone.icon
                className={`mx-auto text-6xl ${selectedMilestone.color.replace(
                  "bg-",
                  "text-"
                )}`}
              />
              <h3 className={`text-lg leading-6 font-medium mt-4 transition-colors duration-300
                            ${isDarkMode ? 'text-[#93a1a1]' : 'text-[#002b36]'}`}>
                {selectedMilestone.title}
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className={`text-sm transition-colors duration-300
                             ${isDarkMode ? 'text-[#839496]' : 'text-[#586e75]'}`}>
                  Detailed information about{" "}
                  {selectedMilestone.title.toLowerCase()} milestone. This
                  section can include more specific details, achievements, or
                  reflections related to this particular point in your career.
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={closeModal}
                  className={`px-4 py-2 text-base font-medium rounded-md w-full shadow-sm transition-colors duration-300
                            ${isDarkMode 
                              ? 'bg-[#073642] text-[#93a1a1] hover:bg-[#586e75] hover:text-[#fdf6e3]' 
                              : 'bg-[#93a1a1] text-[#fdf6e3] hover:bg-[#586e75]'}
                            focus:outline-none focus:ring-2 focus:ring-offset-2`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timeline;
