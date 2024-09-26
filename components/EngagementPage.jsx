// src/components/EngagementPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import tokenImage from '../assets/token.png';
import tokenSound from '../assets/tokenSound.mp3'; // Ensure this file exists

// Import your Roli images
import roli1Image from '../assets/roli1.png';
import roli2Image from '../assets/roli2.png';
import roli3Image from '../assets/roli3.png';
import roli4Image from '../assets/roli4.png';
import roli5Image from '../assets/roli5.png';
import roli6Image from '../assets/roli6.png';
import roli7Image from '../assets/roli7.png';
import roli8Image from '../assets/roli8.png';
import roli9Image from '../assets/roli9.png';

const Container = styled.div`
  padding: 60px 20px;
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(135deg, #1f1c2c, #928dab);
  min-height: 100vh;
  color: #fff;
`;

const Title = styled.h2`
  text-align: center;
  color: #ff6600;
  margin-bottom: 20px;
  font-weight: 700;
  text-shadow: 0 0 10px rgba(255, 102, 0, 0.7);
`;

const ClicksRemaining = styled.p`
  text-align: center;
  font-size: 20px;
  margin-bottom: 40px;
  color: #ffffffcc;
`;

const AppsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const AppCard = styled(motion.div)`
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid #ff6600;
  border-radius: 20px;
  width: 220px;
  height: 220px;
  margin: 15px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(255, 102, 0, 0.6);
  }

  img {
    width: 100px;
    height: 100px;
    margin-bottom: 15px;
    object-fit: contain;
    border-radius: 15px;
    transition: transform 0.3s;
  }

  &:hover img {
    transform: rotate(10deg) scale(1.1);
  }

  h4 {
    font-size: 20px;
    margin-bottom: 10px;
    font-weight: 600;
    text-shadow: 0 0 5px rgba(255, 102, 0, 0.7);
  }
`;

/* Styled components for Token Animation */
const TokenWrapper = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  display: flex;
  align-items: center;
`;

const PlusSign = styled.span`
  font-size: 28px;
  color: #ff6600;
  margin-right: 8px;
  font-weight: 800;
  text-shadow: 0 0 10px rgba(255, 102, 0, 0.8);
`;

const TokenImage = styled.img`
  width: 50px;
  height: 50px;
`;

/* Define animation variants for AppCard */
const cardVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  hover: { scale: 1.05 },
};

/* Define animation variants for TokenWrapper */
const tokenVariants = {
  initial: { opacity: 0, scale: 0.5, y: 0 },
  animate: { opacity: 1, scale: 1.2, y: -100 },
  exit: { opacity: 0, scale: 0.8, y: -150 },
};

const EngagementPage = () => {
  const [remainingClicks, setRemainingClicks] = useState(10);
  const [apps, setApps] = useState([]);
  const [clickedAppId, setClickedAppId] = useState(null);
  const audioRef = useRef(null); // Reference to the audio element

  useEffect(() => {
    const roliImages = [
      roli1Image,
      roli2Image,
      roli3Image,
      roli4Image,
      roli5Image,
      roli6Image,
      roli7Image,
      roli8Image,
      roli9Image,
    ];

    const appsData = roliImages.map((image, index) => ({
      id: index + 1,
      name: `Roli ${index + 1}`,
      image: image,
    }));

    setApps(appsData);
  }, []);

  const handleAppClick = (app) => {
    if (remainingClicks > 0) {
      setRemainingClicks((prev) => prev - 1);
      setClickedAppId(app.id);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }

      // Hide the token animation after it completes
      setTimeout(() => {
        setClickedAppId(null);
      }, 1500); // Duration matches the animation duration
    } else {
      alert('You have no clicks remaining today.');
    }
  };

  return (
    <Container>
      <Title>Engage with Roli!</Title>
      <ClicksRemaining>
        You have <strong>{remainingClicks}</strong> clicks remaining today.
      </ClicksRemaining>
      <AppsContainer>
        {apps.map((app) => (
          <AppCard
            key={app.id}
            onClick={() => handleAppClick(app)}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <img src={app.image} alt={app.name} />
            <h4>{app.name}</h4>

            <AnimatePresence>
              {clickedAppId === app.id && (
                <TokenWrapper
                  variants={tokenVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                >
                  <PlusSign>+</PlusSign>
                  <TokenImage src={tokenImage} alt="Token" />
                </TokenWrapper>
              )}
            </AnimatePresence>
          </AppCard>
        ))}
      </AppsContainer>
      {/* Audio Element for Token Sound */}
      <audio ref={audioRef} src={tokenSound} />
    </Container>
  );
};

export default EngagementPage;
