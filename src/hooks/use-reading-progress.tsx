import { useState, useEffect } from "react";

export function useReadingProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateReadingProgress = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      
      setProgress(Math.min(Math.max(scrolled, 0), 100));
    };

    // Initial calculation
    updateReadingProgress();

    const handleScroll = () => {
      updateReadingProgress();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateReadingProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateReadingProgress);
    };
  }, []);

  return progress;
}
