import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExclamationTriangle } from 'react-icons/fa'; // Warning icon
import tokenImage from '../assets/token.png';
import tokenSound from '../assets/tokenSound.mp3';
import warningSoundFile from '../assets/warning.mp3'; // Ensure this file exists

// Import your Roli images up to Roli24
import roli1Image from '../assets/roli1.png';
import roli2Image from '../assets/roli2.png';
import roli3Image from '../assets/roli3.png';
import roli4Image from '../assets/roli4.png';
import roli5Image from '../assets/roli5.png';
import roli6Image from '../assets/roli6.png';
import roli7Image from '../assets/roli7.png';
import roli8Image from '../assets/roli8.png';
import roli9Image from '../assets/roli9.png';
import roli10Image from '../assets/roli10.png';
import roli11Image from '../assets/roli11.png';
import roli12Image from '../assets/roli12.png';
import roli13Image from '../assets/roli13.png';
import roli14Image from '../assets/roli14.png';
import roli15Image from '../assets/roli15.png';
import roli16Image from '../assets/roli16.png';
import roli17Image from '../assets/roli17.png';
import roli18Image from '../assets/roli18.png';
import roli19Image from '../assets/roli19.png';
import roli20Image from '../assets/roli20.png';
import roli21Image from '../assets/roli21.png';
import roli22Image from '../assets/roli22.png';
import roli23Image from '../assets/roli23.png';
import roli24Image from '../assets/roli24.png';

const Container = styled.div`
  padding: 60px 20px;
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(135deg, #1f1c2c, #928dab);
  min-height: 100vh;
  color: #fff;
  position: relative; /* Relative positioning for the alert */
`;

const Title = styled.h2`
  text-align: center;
  color: #ff6600;
  margin-bottom: 20px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  text-shadow: 0 0 10px rgba(255, 102, 0, 0.7);
  font-size: 32px;

  img {
    width: 32px;
    height: 32px;
    margin-left: 8px;
  }
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
  background: ${({ used }) => (used ? '#2e2e2e' : 'rgba(255, 255, 255, 0.1)')};
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
  transition: transform 0.3s, box-shadow 0.3s, background-color 0.3s;

  &.frozen {
    pointer-events: none; /* Freeze the card after clicking */
  }

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

  .auth-text {
    margin-top: 5px; /* Adjusted the positioning */
    font-size: 12px; /* Smaller text */
    color: #ffffffcc;
    display: flex;
    align-items: center;

    img {
      width: 12px;
      height: 12px;
      margin-left: 4px; /* Space between text and token image */
    }
  }
`;

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

const WarningIcon = styled(FaExclamationTriangle)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 30px;
  color: red;
  opacity: ${({ used }) => (used ? '1' : '0')}; /* Only show if used */
  transition: opacity 0.3s;
`;

const Alert = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.85);
  padding: 40px;
  color: #fff;
  font-size: 18px;
  border-radius: 12px;
  text-align: center;
  z-index: 999; /* Ensure it appears above everything */
  box-shadow: 0 0 15px rgba(255, 102, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 32px;
    height: 32px;
    margin-left: 8px;
  }
`;

const Timer = styled.div`
  font-size: 24px;
  margin-top: 20px;
  color: #ff6600;
`;

const EngagementPage = () => {
  const [remainingClicks, setRemainingClicks] = useState(10);
  const [apps, setApps] = useState([]);
  const [clickedAppId, setClickedAppId] = useState(null);
  const [frozenCards, setFrozenCards] = useState([]); // Track frozen cards
  const [isOutOfClicks, setIsOutOfClicks] = useState(false); // Out of clicks state
  const [timer, setTimer] = useState(86400); // 24 hours in seconds (24 * 60 * 60)
  const audioRef = useRef(null); // Reference to the audio element
  const warningRef = useRef(null); // Reference to warning sound

  useEffect(() => {
    const roliImages = [
      roli1Image, roli2Image, roli3Image, roli4Image, roli5Image,
      roli6Image, roli7Image, roli8Image, roli9Image, roli10Image,
      roli11Image, roli12Image, roli13Image, roli14Image, roli15Image,
      roli16Image, roli17Image, roli18Image, roli19Image, roli20Image,
      roli21Image, roli22Image, roli23Image, roli24Image
    ];

    const appsData = roliImages.map((image, index) => ({
      id: index + 1,
      name: `Roli ${index + 1}`,
      image: image,
    }));

    setApps(appsData);
  }, []);

  useEffect(() => {
    if (isOutOfClicks) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      if (timer <= 0) {
        clearInterval(countdown);
      }

      return () => clearInterval(countdown);
    }
  }, [isOutOfClicks, timer]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  };

  const handleAppClick = (app) => {
    if (remainingClicks > 0 && !frozenCards.includes(app.id)) {
      setRemainingClicks((prev) => prev - 1);
      setClickedAppId(app.id);
      setFrozenCards((prev) => [...prev, app.id]); // Freeze the clicked app

      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }

      setTimeout(() => {
        setClickedAppId(null);
      }, 1500); // Duration matches the animation duration
    } else if (remainingClicks === 0) {
      setIsOutOfClicks(true); // Show out of clicks alert
    } else if (frozenCards.includes(app.id)) {
      if (warningRef.current) {
        warningRef.current.currentTime = 0;
        warningRef.current.play(); // Play warning sound
      }
    }
  };

  return (
    <Container>
      <Title>
        Engage with Roli <img src={tokenImage} alt="Token" />
      </Title>
      <ClicksRemaining>
        You have <strong>{remainingClicks}</strong> clicks remaining today.
      </ClicksRemaining>
      <AppsContainer>
        {apps.map((app) => (
          <AppCard
            key={app.id}
            className={frozenCards.includes(app.id) ? 'frozen' : ''}
            onClick={() => handleAppClick(app)}
            used={frozenCards.includes(app.id)}
          >
            <img src={app.image} alt={app.name} />
            <h4>{app.name}</h4>
            <div className="auth-text">
              Authenticate with Roli <img src={tokenImage} alt="Token" />
            </div>
            {frozenCards.includes(app.id) && (
              <WarningIcon used={frozenCards.includes(app.id)} />
            )}
            <AnimatePresence>
              {clickedAppId === app.id && (
                <TokenWrapper
                  initial={{ opacity: 0, scale: 0.5, y: 0 }}
                  animate={{ opacity: 1, scale: 1.2, y: -100 }}
                  exit={{ opacity: 0, scale: 0.8, y: -150 }}
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

      {/* Out of clicks alert */}
      {isOutOfClicks && (
        <AnimatePresence>
          <Alert
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            You are out of Roli <img src={tokenImage} alt="Token" /> boost clicks for today.
            <Timer>Return in: {formatTime(timer)}</Timer>
          </Alert>
        </AnimatePresence>
      )}

      <audio ref={audioRef} src={tokenSound} />
      <audio ref={warningRef} src={warningSoundFile} />
    </Container>
  );
};

export default EngagementPage;
