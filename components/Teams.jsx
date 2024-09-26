// src/components/Teams.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import tokenImage from '../assets/token.png';
import tokenSound from '../assets/tokenSound.mp3'; // Ensure this file exists

// Sample Data
const data = [
  { name: 'Your Income', value: 400 },
  { name: 'Generation 1', value: 300 },
  { name: 'Generation 2', value: 300 },
  { name: 'Generation 3', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Container = styled.div`
  padding: 60px 20px;
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(135deg, #1f1c2c, #928dab); /* Futuristic background */
  min-height: 100vh;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 36px;
  margin-bottom: 20px;
  text-shadow: 0 0 10px rgba(255, 102, 0, 0.7);
`;

const IncomeContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 800px;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

const IncomeBox = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid #ff6600;
  border-radius: 12px;
  padding: 20px;
  width: 250px;
  margin: 10px;
  text-align: center;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 15px rgba(255, 102, 0, 0.5);

  h3 {
    font-size: 24px;
    margin-bottom: 10px;
    text-shadow: 0 0 5px rgba(255, 102, 0, 0.7);
  }

  p {
    font-size: 18px;
    color: #ffffffcc;
  }
`;

const GraphContainer = styled.div`
  width: 300px;
  height: 300px;
`;

const ReferralGrid = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 40px;
`;

const ReferralCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid #ff6600;
  border-radius: 12px;
  width: 150px;
  height: 150px;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 10px rgba(255, 102, 0, 0.5);
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 20px rgba(255, 102, 0, 0.7);
  }

  h4 {
    font-size: 20px;
    text-align: center;
    text-shadow: 0 0 5px rgba(255, 102, 0, 0.7);
  }
`;

const Teams = () => {
  const [clickedGeneration, setClickedGeneration] = useState(null);
  const audio = new Audio(tokenSound); // Initialize audio

  const handleReferralClick = (generation) => {
    setClickedGeneration(generation);
    audio.currentTime = 0;
    audio.play();

    // Reset the clicked generation after animation
    setTimeout(() => {
      setClickedGeneration(null);
    }, 1500); // Duration should match the animation duration
  };

  return (
    <Container>
      <Title>Your Team and Earnings</Title>

      <IncomeContainer>
        <IncomeBox>
          <h3>Daily Income</h3>
          <p>$150</p>
        </IncomeBox>
        <IncomeBox>
          <h3>All-Time Income</h3>
          <p>$12,000</p>
        </IncomeBox>
      </IncomeContainer>

      <GraphContainer>
        <PieChart width={300} height={300}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </GraphContainer>

      <ReferralGrid>
        {/* Generation 1 */}
        <ReferralCard
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleReferralClick('Generation 1')}
        >
          <h4>Generation 1</h4>
          <AnimatePresence>
            {clickedGeneration === 'Generation 1' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 0 }}
                animate={{ opacity: 1, scale: 1.2, y: -50 }}
                exit={{ opacity: 0, scale: 0.8, y: -100 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: '24px', color: '#ff6600', marginRight: '8px' }}>+</span>
                <img src={tokenImage} alt="Token" style={{ width: '40px', height: '40px' }} />
              </motion.div>
            )}
          </AnimatePresence>
        </ReferralCard>
        {/* Generation 2 */}
        <ReferralCard
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleReferralClick('Generation 2')}
        >
          <h4>Generation 2</h4>
          <AnimatePresence>
            {clickedGeneration === 'Generation 2' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 0 }}
                animate={{ opacity: 1, scale: 1.2, y: -50 }}
                exit={{ opacity: 0, scale: 0.8, y: -100 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: '24px', color: '#ff6600', marginRight: '8px' }}>+</span>
                <img src={tokenImage} alt="Token" style={{ width: '40px', height: '40px' }} />
              </motion.div>
            )}
          </AnimatePresence>
        </ReferralCard>
        {/* Generation 3 */}
        <ReferralCard
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleReferralClick('Generation 3')}
        >
          <h4>Generation 3</h4>
          <AnimatePresence>
            {clickedGeneration === 'Generation 3' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 0 }}
                animate={{ opacity: 1, scale: 1.2, y: -50 }}
                exit={{ opacity: 0, scale: 0.8, y: -100 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: '24px', color: '#ff6600', marginRight: '8px' }}>+</span>
                <img src={tokenImage} alt="Token" style={{ width: '40px', height: '40px' }} />
              </motion.div>
            )}
          </AnimatePresence>
        </ReferralCard>
      </ReferralGrid>
    </Container>
  );
};

export default Teams;
