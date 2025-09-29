"use client";
import { useState, useEffect, useCallback, memo } from "react";
import "../styles/cursor.css";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  // Use useCallback to optimize event handler
  const updatePosition = useCallback((e) => {
    // Use requestAnimationFrame to optimize rendering performance
    requestAnimationFrame(() => {
      const { clientX, clientY } = e;
      setPosition({ x: clientX, y: clientY });

      // Check element type under cursor and set appropriate cursor style
      const target = e.target;

      // Optimize condition checks with more concise approach
      if (
        target.matches('a, button, [role="button"]') ||
        target.closest('a, button, [role="button"]')
      ) {
        setCursorType("link");
      } else if (
        target.matches(
          "input, textarea, [contenteditable], p, h1, h2, h3, h4, h5, h6, span"
        )
      ) {
        setCursorType("text");
      } else if (target.disabled || target.matches(".disabled, [disabled]")) {
        setCursorType("not-allowed");
      } else if (target.matches(".loading, .processing, .busy-cursor")) {
        setCursorType("busy");
      } else {
        setCursorType("");
      }
    });
  }, []);

  // Handle mouse visibility
  const handleMouseEnter = useCallback(() => setIsVisible(true), []);
  const handleMouseLeave = useCallback(() => setIsVisible(false), []);

  useEffect(() => {
    // Add mouse enter/leave handling

    // Performance optimization: only update position when mouse moves
    window.addEventListener("mousemove", updatePosition, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Ensure initial visibility if mouse is already on page
    if (typeof document !== "undefined" && document.hasFocus()) {
      setIsVisible(true);
    }

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [updatePosition, handleMouseEnter, handleMouseLeave]);

  // Don't render if not visible
  if (!isVisible) return null;

  return (
    <div
      className={`custom-cursor ${cursorType}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        opacity: isVisible ? 1 : 0,
        willChange: "transform",
      }}
      aria-hidden="true"
    />
  );
};

// Memoize component to prevent unnecessary re-renders
export default memo(CustomCursor);
