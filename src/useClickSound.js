// src/hooks/useClickSound.js
import { useEffect } from 'react';

export const useClickSound = (soundFile) => {
  useEffect(() => {
    const clickSound = new Audio(soundFile);

    const handleClick = () => {
      clickSound.currentTime = 0; // Rewind to the start
      clickSound.play(); // Play the sound
    };

    // Add event listener to all buttons
    const buttons = document.querySelectorAll('button, a, input[type="submit"]');
    buttons.forEach((button) => button.addEventListener('click', handleClick));

    // Cleanup function to remove the event listener
    return () => {
      buttons.forEach((button) => button.removeEventListener('click', handleClick));
    };
  }, [soundFile]);
};
