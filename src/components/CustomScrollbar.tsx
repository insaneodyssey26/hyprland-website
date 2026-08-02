"use client";

import { useEffect, useState } from "react";

export default function CustomScrollbar({ targetId }: { targetId?: string }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const totalLines = 30;

  useEffect(() => {
    let cleanupFunc: (() => void) | null = null;

    const timer = setTimeout(() => {
      const targetElement = targetId ? document.getElementById(targetId) : window;
      
      const handleScroll = () => {
        let scrollTop = 0;
        let docHeight = 0;

        if (targetId) {
          const el = document.getElementById(targetId);
          if (el) {
            scrollTop = el.scrollTop;
            docHeight = el.scrollHeight - el.clientHeight;
          }
        } else {
          scrollTop = window.scrollY;
          docHeight = document.documentElement.scrollHeight - window.innerHeight;
        }
        
        if (docHeight > 0) {
          setScrollProgress(scrollTop / docHeight);
        } else {
          setScrollProgress(0);
        }
      };

      if (targetElement) {
        targetElement.addEventListener("scroll", handleScroll);
        handleScroll();
      }
      
      window.addEventListener("resize", handleScroll);
      
      cleanupFunc = () => {
        if (targetElement) {
          targetElement.removeEventListener("scroll", handleScroll);
        }
        window.removeEventListener("resize", handleScroll);
      };
    }, 100);

    return () => {
      clearTimeout(timer);
      if (cleanupFunc) cleanupFunc();
    };
  }, [targetId]);

  return (
    <div className="custom-scrollbar-container">
      {Array.from({ length: totalLines }).map((_, i) => {
        const linePos = i / (totalLines - 1);
        const dist = Math.abs(scrollProgress - linePos);
        const maxScale = 5; 
        const minScale = 1;
        const threshold = 0.12; 
        
        let scale = minScale;
        let opacity = 0.2;
        
        if (dist < threshold) {
          const normalized = 1 - (dist / threshold);
          scale = minScale + (maxScale - minScale) * (normalized * normalized);
          opacity = 0.2 + (0.8 * normalized);
        }

        return (
          <div 
            key={i} 
            className="scroll-line"
            style={{
              transform: `scaleX(${scale})`,
              opacity: opacity
            }}
          />
        );
      })}
    </div>
  );
}
