import React, { useState, useEffect } from 'react';

const TypewriterEffect = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, 30); // Adjust the speed of typing here

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  useEffect(() => {
    setCurrentIndex(0);
    setDisplayedText("")
  }, [text])

  return (
    <p>
      {displayedText}
    </p>
  );
};

export default TypewriterEffect;
