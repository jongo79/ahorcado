import React, { useEffect, useRef, useState } from 'react';
import gameOverImage from './images/gameover.jpg';
import youWinImage1 from './images/youWin1.jpg';
import youWinImage2 from './images/youWin2.jpg';
import youWinImage3 from './images/youWin3.jpg';

// Define transparentImageDataURI outside of the component

const StrobeBanner = ({ gameOverImage, youWinImages }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const imageRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % youWinImages.length);
    }, 100); // Adjust the interval as needed for the strobe effect

    return () => clearInterval(interval);
  }, [youWinImages]);

 
  return (
    <div>
      <img ref={imageRef} alt="Banner Image" />
    </div>
  );
};

StrobeBanner.defaultProps = {
  gameOverImage: transparentImageDataURI, // Set initial state to transparentImage
  youWinImages: [] // Set initial state to empty array
};

export default StrobeBanner;
