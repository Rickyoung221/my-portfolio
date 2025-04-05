"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import DraggableWindow from "@/components/layout/DraggableWindow";
import { useTheme } from '@/context/ThemeContext';
import WindowContent from './components/WindowContent';
import { getInitialPosition, getWindowTitle } from './utils/windowUtils';

const Interests = ({ containerRef }) => {
  const { isDarkMode } = useTheme();
  const [windows, setWindows] = useState(null);
  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0
  });
  const isInitializedRef = useRef(false);
  const previousDimensionsRef = useRef({ width: 0, height: 0 });
  
  // 防抖函数
  const debounce = useCallback((func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }, []);

  // 更新容器尺寸
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const viewportHeight = window.innerHeight;
        const navbarHeight = 64;
        const availableHeight = viewportHeight - navbarHeight;
        
        const newDimensions = {
          width: containerRef.current.offsetWidth,
          height: availableHeight
        };

        setContainerDimensions(newDimensions);
      }
    };

    const debouncedUpdateDimensions = debounce(updateDimensions, 100);
    updateDimensions();
    window.addEventListener('resize', debouncedUpdateDimensions);
    return () => window.removeEventListener('resize', debouncedUpdateDimensions);
  }, [containerRef, debounce]);

  // 处理窗口位置更新
  useEffect(() => {
    if (!windows || !containerDimensions.width || !containerDimensions.height) return;

    const { width: prevWidth, height: prevHeight } = previousDimensionsRef.current;
    if (prevWidth === 0 && prevHeight === 0) {
      previousDimensionsRef.current = containerDimensions;
      return;
    }

    if (prevWidth !== containerDimensions.width || prevHeight !== containerDimensions.height) {
      const scaleX = containerDimensions.width / prevWidth;
      const scaleY = containerDimensions.height / prevHeight;

      setWindows(prevWindows => 
        prevWindows.map(win => ({
          ...win,
          position: {
            x: Math.min(Math.floor(win.position.x * scaleX), containerDimensions.width - 300),
            y: Math.min(Math.floor(win.position.y * scaleY), containerDimensions.height - 300)
          }
        }))
      );

      previousDimensionsRef.current = containerDimensions;
    }
  }, [containerDimensions]);

  // 初始化窗口位置
  useEffect(() => {
    if (isInitializedRef.current || !containerDimensions.width || !containerDimensions.height) return;

    const windowIds = ['photography', 'music', 'pet', 'travel', 'fitness', 'anime', 'art', 'volunteer'];
    setWindows(
      windowIds.map((id, index) => ({
        ...getInitialPosition(index, windowIds.length, containerDimensions),
        id
      }))
    );
    
    isInitializedRef.current = true;
    previousDimensionsRef.current = containerDimensions;
  }, [containerDimensions]);

  // 处理窗口移动和碰撞
  useEffect(() => {
    if (!windows || !containerDimensions.width || !containerDimensions.height) return;

    let animationFrameId;
    const windowWidth = 300;
    const windowHeight = 300;

    const updatePositions = () => {
      setWindows(prevWindows => 
        prevWindows.map(win => {
          if (win.isDragging || !win.isVisible) return win;

          // 计算窗口的新位置（四个边界）
          const newLeft = win.position.x + win.velocity.x;
          const newRight = newLeft + windowWidth;
          const newTop = win.position.y + win.velocity.y;
          const newBottom = newTop + windowHeight;

          let newVelocityX = win.velocity.x;
          let newVelocityY = win.velocity.y;

          // 水平方向的碰撞检测（左右边界）
          if (newLeft <= 0 || newRight >= containerDimensions.width) {
            newVelocityX = -win.velocity.x;
          }
          
          // 垂直方向的碰撞检测（上下边界）
          // navbar高度为64px，footer padding为16px
          const minTop = 0; // navbar的下边界对应容器的0位置
          const maxBottom = containerDimensions.height - 16; // 减去footer padding
          if (newTop <= minTop || newBottom >= maxBottom) {
            newVelocityY = -win.velocity.y;
          }

          // 确保窗口完全在可视区域内
          const boundedX = Math.max(0, Math.min(newLeft, containerDimensions.width - windowWidth));
          const boundedY = Math.max(minTop, Math.min(newTop, maxBottom - windowHeight));

          return {
            ...win,
            position: {
              x: boundedX,
              y: boundedY
            },
            velocity: {
              x: newVelocityX,
              y: newVelocityY
            }
          };
        })
      );

      animationFrameId = requestAnimationFrame(updatePositions);
    };

    animationFrameId = requestAnimationFrame(updatePositions);
    return () => cancelAnimationFrame(animationFrameId);
  }, [windows, containerDimensions]);

  const handleDragStart = useCallback((id) => {
    setWindows(prevWindows =>
      prevWindows.map(win =>
        win.id === id ? { ...win, isDragging: true } : win
      )
    );
  }, []);

  const handleDragStop = useCallback((id) => {
    setWindows(prevWindows =>
      prevWindows.map(win =>
        win.id === id ? { ...win, isDragging: false } : win
      )
    );
  }, []);

  const handleDrag = useCallback((id, data) => {
    const windowWidth = 300;
    const windowHeight = 300;
    const maxBottom = containerDimensions.height - 16; // 减去footer padding
    
    setWindows(prevWindows =>
      prevWindows.map(win =>
        win.id === id
          ? {
              ...win,
              position: {
                x: Math.max(0, Math.min(data.x, containerDimensions.width - windowWidth)),
                y: Math.max(0, Math.min(data.y, maxBottom - windowHeight))
              }
            }
          : win
      )
    );
  }, [containerDimensions]);

  const handleClose = useCallback((id) => {
    setWindows(prevWindows =>
      prevWindows.map(win =>
        win.id === id ? { ...win, isVisible: false } : win
      )
    );
  }, []);

  if (!windows) return null;

  return (
    <div 
      className={`
        w-full 
        h-full
        pb-16 
        relative 
        transition-colors 
        duration-300
        ${isDarkMode ? 'bg-[#002b36]' : 'bg-[#fdf6e3]'}
      `}
      style={{
        height: `${containerDimensions.height}px`,
      }}
    >
      {windows.map((window) => (
        window.isVisible && (
          <DraggableWindow
            key={window.id}
            title={getWindowTitle(window.id)}
            defaultPosition={window.position}
            bounds="parent"
            onStart={() => handleDragStart(window.id)}
            onStop={() => handleDragStop(window.id)}
            onDrag={(e, data) => handleDrag(window.id, data)}
            position={window.position}
            onClose={() => handleClose(window.id)}
            className={`${isDarkMode ? 'bg-[#073642] text-[#93a1a1]' : 'bg-[#eee8d5] text-[#586e75]'}`}
          >
            <WindowContent id={window.id} />
          </DraggableWindow>
        )
      ))}
    </div>
  );
};

export default Interests;
