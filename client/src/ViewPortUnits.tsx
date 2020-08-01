/**
 * Custom viewport unit support.
 * Adds custom properties to the root element in response to window resize.
 *
 * --vh = 1% of Viewport height (window.innerHeight)
 * --vw = 1% of Viewport width (window.innerWidth)
 * --vmin = Smaller of --vh or --vw
 * --vmax = Larger of --vh or --vw
 */
import React, { useEffect } from 'react';

const handleResize = () => {
  const vh = window.innerHeight / 100;
  const vw = window.innerWidth / 100;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  document.documentElement.style.setProperty('--vw', `${vw}px`);
  document.documentElement.style.setProperty('--vmin', `${Math.min(vh, vw)}px`);
  document.documentElement.style.setProperty('--vmax', `${Math.max(vh, vw)}px`);
}

const ViewPortUnits: React.FC = ({ children }) => {
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <>{ children }</>
};

export default ViewPortUnits;
