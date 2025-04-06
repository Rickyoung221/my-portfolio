"use client";
import "react-vertical-timeline-component/style.min.css";
import React, { useState, useEffect, useRef, memo } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import TIMELINE_ITEMS from "@/data/timelineItems";
import Image from "next/image";
import { useTheme } from '@/context/ThemeContext';

function TimelineDynamics() {
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [visibleElements, setVisibleElements] = useState({});
  const { isDarkMode } = useTheme();
  const timelineRefs = useRef([]);
  const observerRef = useRef(null);

  const checkElementInViewport = (element) => {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  };

  useEffect(() => {
    setMounted(true);

    const initialVisibility = {};
    TIMELINE_ITEMS.forEach((_, index) => {
      initialVisibility[index] = false;
    });

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-id');
          if (entry.isIntersecting || checkElementInViewport(entry.target)) {
            setVisibleElements((prev) => ({ ...prev, [id]: true }));
          }
        });
      },
      {
        root: null,
        rootMargin: '50px 0px',
        threshold: [0, 0.1, 0.2],
      }
    );

    const initializeVisibility = () => {
      timelineRefs.current.forEach((ref, index) => {
        if (ref && checkElementInViewport(ref)) {
          initialVisibility[index] = true;
        }
      });
      setVisibleElements(initialVisibility);

      timelineRefs.current.forEach((ref) => {
        if (ref) {
          observerRef.current.observe(ref);
        }
      });
    };

    requestAnimationFrame(initializeVisibility);

    const handleScroll = () => {
      timelineRefs.current.forEach((ref, index) => {
        if (ref && checkElementInViewport(ref)) {
          setVisibleElements((prev) => ({ ...prev, [index]: true }));
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.history.scrollRestoration = 'auto';
      }
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative w-full overflow-visible px-4 sm:px-6 lg:px-8">
      <h3 className={`text-xl sm:text-2xl font-medium text-center mb-6 sm:mb-8 transition-colors duration-300
                    ${isDarkMode ? 'text-[#93a1a1]' : 'text-[#002b36]'}`}>
        My Timeline 🚀
      </h3>
      <div className="mx-auto max-w-5xl overflow-visible">
        <VerticalTimeline
          animate={true}
          lineColor={isDarkMode ? '#93a1a1' : '#002b36'}
          className="overflow-visible vertical-timeline-custom"
        >
          {TIMELINE_ITEMS.map((item, index) => (
            <div
              key={index}
              ref={(el) => (timelineRefs.current[index] = el)}
              data-id={index}
              className="overflow-visible my-4 sm:my-0"
            >
              <TimelineItem
                item={item}
                index={index}
                onClick={setSelectedMilestone}
                isDarkMode={isDarkMode}
                visible={visibleElements[index]}
              />
            </div>
          ))}
        </VerticalTimeline>
      </div>

      {selectedMilestone && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 px-4 sm:px-0"
          onClick={() => setSelectedMilestone(null)}
        >
          <div
            className={`relative top-20 mx-auto p-5 border w-full max-w-sm sm:max-w-md md:max-w-lg shadow-lg rounded-md ${
              isDarkMode ? 'bg-[#002b36] text-[#93a1a1]' : 'bg-white text-[#002b36]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mt-3">
              <Image
                height={80}
                width={80}
                src={selectedMilestone.logo}
                alt={`${selectedMilestone.title} logo`}
                className="mx-auto w-20 h-20 rounded-full object-contain"
                priority={true}
              />
              <h3 className={`text-lg leading-6 font-medium mt-4 ${
                isDarkMode ? 'text-[#93a1a1]' : 'text-[#002b36]'
              }`}>
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
                  onClick={() => setSelectedMilestone(null)}
                  className={`px-4 py-2 text-base font-medium rounded-md w-full shadow-sm focus:outline-none focus:ring-2 ${
                    isDarkMode
                      ? 'bg-[#268bd2] text-[#fdf6e3] hover:bg-[#2aa198] focus:ring-[#2aa198]'
                      : 'bg-[#268bd2] text-[#fdf6e3] hover:bg-[#2aa198] focus:ring-[#2aa198]'
                  }`}
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
}

const TimelineItem = memo(({ item, index, onClick, isDarkMode, visible }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="timeline-item-wrapper">
      <VerticalTimelineElement
        className={`vertical-timeline-element--work transition-all duration-300 ease-in-out
          ${isHovered ? 'timeline-hovered' : ''}`}
        visible={visible}
        position={index % 2 === 0 ? "left" : "right"}
        date={item.date}
        dateClassName={`${isDarkMode ? 'text-[#93a1a1]' : 'text-[#002b36]'} 
          transition-all duration-300 ease-in-out text-sm sm:text-base
          ${isHovered ? 'scale-105 font-semibold' : ''}`}
        contentStyle={{
          background: isDarkMode ? '#073642' : '#fdf6e3',
          color: isDarkMode ? '#93a1a1' : '#002b36',
          boxShadow: isDarkMode 
            ? `0 3px 0 #073642${isHovered ? ', 0 4px 20px rgba(0,0,0,0.3)' : ''}`
            : `0 3px 0 #fdf6e3${isHovered ? ', 0 4px 20px rgba(0,0,0,0.1)' : ''}`,
          border: isDarkMode ? '1px solid #586e75' : '1px solid #93a1a1',
          transform: isHovered ? 'scale(1.02)' : 'scale(1)',
          transition: 'all 0.3s ease-in-out',
          padding: '1.25rem',
          marginBottom: '1.5rem',
          cursor: 'pointer',
        }}
        contentArrowStyle={{
          borderRight: isDarkMode ? '7px solid #073642' : '7px solid #fdf6e3',
          transition: 'all 0.3s ease-in-out',
        }}
        iconStyle={{
          background: isDarkMode ? '#002b36' : '#fff',
          border: isDarkMode ? '2px solid #586e75' : '2px solid #93a1a1',
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          transition: 'all 0.3s ease-in-out',
        }}
        icon={
          <div className={`w-full h-full rounded-full overflow-hidden transition-all duration-300 ease-in-out ${
            isHovered 
              ? `ring-4 ring-opacity-50 ring-offset-2 ${
                  isDarkMode 
                    ? 'ring-[#268bd2] ring-offset-[#002b36]' 
                    : 'ring-[#2aa198] ring-offset-white'
                }`
              : ''
          }`}>
            <Image
              src={item.logo}
              alt={`${item.title} logo`}
              className="w-full h-full rounded-full object-contain"
              width={40}
              height={40}
              sizes="(max-width: 768px) 40px, 100px"
              priority={index < 2}
              loading={index < 2 ? "eager" : "lazy"}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/100";
              }}
            />
          </div>
        }
        onClick={() => onClick(item)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`transition-all duration-300
            ${isHovered ? 'transform scale-105' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => onClick(item)}
        >
          <h3 className={`text-base sm:text-lg font-semibold ${
            isDarkMode ? 'text-[#93a1a1]' : 'text-[#002b36]'
          }`}>
            {item.title}
          </h3>
          <h4 className={`text-xs sm:text-sm ${
            isDarkMode ? 'text-[#839496]' : 'text-[#586e75]'
          }`}>
            {item.location}
          </h4>
          <p className={`text-xs sm:text-sm mt-2 ${
            isDarkMode ? 'text-[#839496]' : 'text-[#586e75]'
          }`}>
            {item.description}
          </p>
          <div className={`text-xs sm:text-sm font-semibold mt-4 ${
            isDarkMode ? 'text-[#268bd2]' : 'text-[#268bd2]'
          }`}>
            Click for more details
          </div>
        </div>
      </VerticalTimelineElement>
    </div>
  );
});

TimelineItem.displayName = 'TimelineItem';

export default TimelineDynamics;