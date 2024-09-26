// src/components/EngagementPage.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import tokenImage from '../assets/token.png';

// Import your images
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
  padding: 40px 20px;
  font-family: 'Poppins', sans-serif;
`;

const Title = styled.h2`
  text-align: center;
  color: #ff6600;
  margin-bottom: 20px;
  font-weight: 600;
`;

const ClicksRemaining = styled.p`
  text-align: center;
  font-size: 18px;
  margin-bottom: 40px;
`;

const AppsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const AppCard = styled(motion.div)`
  position: relative;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 12px;
  width: 220px;
  margin: 15px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  img {
    width: 100px;
    height: 100px;
    margin-bottom: 15px;
    object-fit: contain;
    border-radius: 12px;
  }

  h4 {
    font-size: 18px;
    margin-bottom: 10px;
    font-weight: 600;
  }
`;

/* Existing styled components for TokenWrapper, PlusSign, TokenImage */
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
  font-size: 24px;
  color: #ff6600;
  margin-right: 5px;
  font-weight: 700;
`;

const TokenImage = styled.img`
  width: 40px;
  height: 40px;
`;

/* Define animation variants */
const animationVariants = [
  {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
  {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
  },
  {
    initial: { opacity: 0, rotate: -10 },
    animate: { opacity: 1, rotate: 0 },
  },
  // Add more variants if desired
];

const EngagementPage = () => {
  const [remainingClicks, setRemainingClicks] = useState(10);
  const [apps, setApps] = useState([]);
  const [clickedAppId, setClickedAppId] = useState(null);

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
    const variantsCount = animationVariants.length;
    const appsData = roliImages.map((image, index) => ({
      id: index + 1,
      name: `App ${index + 1}`,
      image: image,
      animation: animationVariants[Math.floor(Math.random() * variantsCount)],
    }));
    setApps(appsData);
  }, []);

  const handleAppClick = (app) => {
    if (remainingClicks > 0) {
      setRemainingClicks(remainingClicks - 1);
      setClickedAppId(app.id);

      // Hide the token image after the animation duration
      setTimeout(() => {
        setClickedAppId(null);
      }, 2000);
    } else {
      alert('You have no clicks remaining today.');
    }
  };

  return (
    <Container>
      <Title>Explore Apps and Earn Rewards</Title>
      <ClicksRemaining>
        You have <strong>{remainingClicks}</strong> clicks remaining today.
      </ClicksRemaining>
      <AppsContainer>
        {apps.map((app) => (
          <AppCard
            key={app.id}
            onClick={() => handleAppClick(app)}
            initial={app.animation.initial}
            animate={app.animation.animate}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <img src={app.image} alt={app.name} />
            <h4>{app.name}</h4>

            <AnimatePresence>
              {clickedAppId === app.id && (
                <TokenWrapper
                  initial={{ opacity: 0, y: 0, scale: 0.5 }}
                  animate={{ opacity: 1, y: -50, scale: 1 }}
                  exit={{ opacity: 0, y: -100, scale: 1 }}
                  transition={{ duration: 2, ease: 'easeOut' }}
                >
                  <PlusSign>+</PlusSign>
                  <TokenImage src={tokenImage} alt="Token" />
                </TokenWrapper>
              )}
            </AnimatePresence>
          </AppCard>
        ))}
      </AppsContainer>
    </Container>
  );
};

export default EngagementPage;
