import { useState, useEffect } from "react";

export function useParallax(intensity: number = 0.5): number {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      setOffset(scrolled * intensity);
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    const handleScroll = () => {
      requestTick();
    };

    // Initial calculation
    updateParallax();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [intensity]);

  return offset;
}
