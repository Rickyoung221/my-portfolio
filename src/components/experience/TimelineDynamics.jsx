import React, { useState, useEffect, useRef } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import TIMELINE_ITEMS from "@/data/timelineItems";
import Image from "next/image";
import { useTheme } from '@/context/ThemeContext';
import { motion, useInView } from 'framer-motion';

function Timeline() {
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const { isDarkMode } = useTheme();

  const handleMilestoneClick = (milestone) => {
    setSelectedMilestone(milestone);
  };

  const closeModal = () => {
    setSelectedMilestone(null);
  };

  return (
    <>
      <h3 className={`text-xl sm:text-2xl font-medium text-center mb-4 transition-colors duration-300
                    ${isDarkMode ? 'text-[#93a1a1]' : 'text-[#002b36]'}`}>
        My Timeline 🚀
      </h3>
      <div className="mx-auto max-w-5xl">
        <VerticalTimeline>
          {TIMELINE_ITEMS.map((item, index) => (
            <TimelineItem
              key={index}
              item={item}
              index={index}
              onClick={handleMilestoneClick}
            />
          ))}
        </VerticalTimeline>
      </div>

      {selectedMilestone && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
          onClick={closeModal}
        >
          <div
            className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mt-3">
              <Image
                height={80}
                width={80}
                src={selectedMilestone.logo}
                alt={`${selectedMilestone.title} logo`}
                className="mx-auto w-20 h-20 rounded-full"
              />
              <h3 className="text-lg leading-6 font-medium text-gray-900 mt-4">
                {selectedMilestone.title}
              </h3>
              <h4 className="text-sm text-gray-600">
                {selectedMilestone.date}
              </h4>
              <p className="text-sm mt-4 text-gray-400">
                {selectedMilestone.details}
              </p>
              <div className="items-center px-4 py-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-800 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const TimelineItem = ({ item, index, onClick }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <VerticalTimelineElement
      date={item.date}
      dateClassName={`${isDarkMode ? 'text-white' : 'text-[#002b36]'} ${
        index % 2 === 0
          ? "date-right text-left ml-6"
          : "date-left text-center !text-right !mr-6"
      }`}
      contentStyle={{
        background: index % 2 === 0 ? "#e0f7fa" : "#fce4ec",
        color: "#333",
        cursor: "pointer",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      contentArrowStyle={{
        borderRight: `7px solid ${index % 2 === 0 ? "#00bcd4" : "#ec407a"}`,
      }}
      iconStyle={{
        background: "#fff",
        border: "2px solid #00bcd4",
      }}
      icon={
        <Image
          src={item.logo}
          alt={`${item.title} logo`}
          className="w-full h-full rounded-full"
          style={{ objectFit: "contain" }}
          width={100}
          height={100}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/100";
          }}
        />
      }
      onClick={() => onClick(item)}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.0)";
        e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        className="hover:scale-105 transition-all duration-300"
        onClick={() => onClick(item)}
      >
        <h3 className="vertical-timeline-element-title font-semibold">
          {item.title}
        </h3>
        <h4 className="vertical-timeline-element-subtitle text-gray-600">
          {item.location}
        </h4>
        <p className="text-sm mt-2">{item.description}</p>
        <div className="text-sm text-blue-500 font-semibold mt-4">
          Click for more details
        </div>
      </div>
    </VerticalTimelineElement>
  );
};

export default Timeline;
