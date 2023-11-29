import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';

const Loader = () => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prevPercentage) => (prevPercentage < 100 ? prevPercentage + 1 : prevPercentage));
    }, 20);

    // Simulate a 2-second loading time
    setTimeout(() => {
      clearInterval(interval);

      // Fade out the loader using GSAP
      gsap.to('.loader-container', { opacity: 0, duration: 1, onComplete: removeLoader });
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const removeLoader = () => {
    // Remove the loader from the DOM after the fade-out animation
    const loader = document.querySelector('.loader-container');
    if (loader) {
      loader.remove();
    }
  };

  return (
    <div className="loader-container fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 opacity-100 bg-white">
      <div className="fixed top-0 left-0 w-full h-full bg-white opacity-75 z-40"></div>
      <div className="relative z-50 text-6xl font-bold text-gray-800">{percentage}%</div>
    </div>
  );
};

export default Loader;
