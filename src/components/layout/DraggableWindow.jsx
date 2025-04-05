"use client";
import React, { useState, useRef, useEffect } from 'react';
import Draggable from "react-draggable";
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const DraggableWindow = React.memo(
  ({ title, children, defaultPosition, bounds, onStart, onStop, onDrag, position, onClose, className }) => {
    const nodeRef = useRef(null);
    const { isDarkMode } = useTheme();

    return (
      <Draggable
        defaultPosition={defaultPosition}
        position={position}
        bounds={bounds}
        nodeRef={nodeRef}
        onStart={(e) => {
          // 只允许从标题栏拖拽
          const target = e.target;
          const isHeader = target.closest('[data-handle="true"]');
          if (!isHeader) {
            return false;
          }
          onStart?.(e);
        }}
        onStop={onStop}
        onDrag={onDrag}
        grid={[1, 1]} // 添加1像素的网格对齐
        scale={1} // 确保缩放比例为1
      >
        <div
          ref={nodeRef}
          className={`
            absolute w-[300px] rounded-lg shadow-lg overflow-hidden
            transition-colors duration-300
            ${isDarkMode ? 
              'bg-gray-800 text-white border border-gray-700' : 
              'bg-white text-gray-900 border border-gray-200'
            }
            ${className}
          `}
          style={{
            transition: 'box-shadow 0.3s ease',
            cursor: 'default',
            userSelect: 'none'
          }}
        >
          {/* 窗口顶部 - 添加data-handle属性标识可拖拽区域 */}
          <div
            data-handle="true"
            className={`
              flex justify-between items-center px-4 py-2 cursor-move
              ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}
            `}
          >
            <h3 className="text-sm font-medium select-none">{title}</h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose?.();
              }}
              className={`
                p-1 rounded-full
                ${isDarkMode ? 
                  'hover:bg-gray-600 text-gray-400 hover:text-white' : 
                  'hover:bg-gray-200 text-gray-500 hover:text-gray-700'
                }
              `}
            >
              ×
            </button>
          </div>

          {/* 窗口内容 */}
          <div className="p-4">{children}</div>
        </div>
      </Draggable>
    );
  }
);

DraggableWindow.displayName = "DraggableWindow";

export default DraggableWindow;
