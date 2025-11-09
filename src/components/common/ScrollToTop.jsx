// src/components/common/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  // --- THIS IS THE NEW FIX ---
  // This effect runs ONCE on mount to disable the browser's
  // native scroll restoration behavior.
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []); // Empty dependency array means it runs only once

  // This effect runs every time the path changes to scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // This component renders nothing
};

export default ScrollToTop;