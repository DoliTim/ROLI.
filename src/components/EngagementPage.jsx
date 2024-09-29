import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios'; // Import axios for API requests
import { motion, AnimatePresence } from 'framer-motion';
import { FaExclamationTriangle } from 'react-icons/fa';
import tokenImage from '../assets/token.png';
import tokenSound from '../assets/tokenSound.mp3';
import warningSoundFile from '../assets/warning.mp3';

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

const Container = styled.div`
  padding: 60px 20px;
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(135deg, #1f1c2c, #928dab);
  min-height: 100vh;
  color: #fff;
  position: relative;
`;

const Title = styled.h2`
  text-align: center;
  color: #ff6600;
  margin-bottom: 20px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
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

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(255, 102, 0, 0.6);
  }

  img {
    width: 100px;
    height: 100px;
    margin-bottom: 15px;
  }

  h4 {
    font-size: 20px;
    font-weight: 600;
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
`;

const TokenImage = styled.img`
  width: 50px;
  height: 50px;
`;

const EngagementPage = () => {
  const [remainingClicks, setRemainingClicks] = useState(10);
  const [apps, setApps] = useState([]);
  const [clickedAppIds, setClickedAppIds] = useState([]); // Track multiple clicked app IDs
  const [frozenCards, setFrozenCards] = useState([]);
  const [tokensEarned, setTokensEarned] = useState(0); // Track tokens earned
  const audioRef = useRef(null);

  const userId = 'your-user-id'; // Replace this with the logged-in user's ID

  useEffect(() => {
    // Preload app data
    const roliImages = [
      roli1Image, roli2Image, roli3Image, roli4Image, roli5Image,
      roli6Image, roli7Image, roli8Image, roli9Image, roli10Image,
      roli11Image, roli12Image, roli13Image, roli14Image, roli15Image,
      roli16Image, roli17Image, roli18Image, roli19Image, roli20Image
    ];

    const getRandomApps = () => {
      const shuffled = [...roliImages].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 10); // Select 10 random Roli images
    };

    const appsData = getRandomApps().map((image, index) => ({
      id: index + 1,
      name: `Roli ${index + 1}`,
      image: image,
    }));

    setApps(appsData);

    // Fetch initial token count for the user
    axios
      .get(`http://localhost:5000/user/${userId}/roli-tokens`)
      .then((response) => setTokensEarned(response.data.amount_of_roli_tokens))
      .catch((error) => console.error('Failed to fetch user tokens:', error));
  }, [userId]);

  const handleAppClick = async (app) => {
    if (remainingClicks > 0 && !frozenCards.includes(app.id)) {
      setRemainingClicks((prev) => prev - 1);
      setClickedAppIds((prev) => [...prev, app.id]);
      setFrozenCards((prev) => [...prev, app.id]);

      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }

      // Call the API to increment tokens
      try {
        const response = await axios.post(
          `http://localhost:5000/engagement/${userId}`,
          { reward: 1 }
        );
        setTokensEarned(response.data.amount_of_roli_tokens); // Update token count
      } catch (error) {
        console.error('Error updating tokens:', error);
      }

      setTimeout(() => {
        setClickedAppIds([]);
      }, 1500);
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
            onClick={() => handleAppClick(app)}
            used={frozenCards.includes(app.id)}
          >
            <img src={app.image} alt={app.name} />
            <h4>{app.name}</h4>
            {clickedAppIds.includes(app.id) && (
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
          </AppCard>
        ))}
      </AppsContainer>
      <audio ref={audioRef} src={tokenSound} />
    </Container>
  );
};

export default EngagementPage;
