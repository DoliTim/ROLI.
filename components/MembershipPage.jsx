// src/components/MembershipPage.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaCrown } from 'react-icons/fa';

const Container = styled.div`
  padding: 60px 20px;
`;

const Title = styled.h2`
  text-align: center;
  color: #ff6600;
  margin-bottom: 40px;
`;

const LevelsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const LevelCard = styled.div`
  background-color: #fff;
  border: 2px solid #ff6600;
  border-radius: 8px;
  width: 280px;
  margin: 20px;
  padding: 30px;
  text-align: center;

  svg {
    font-size: 48px;
    color: #ff6600;
    margin-bottom: 10px;
  }

  h3 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  p {
    font-size: 18px;
    margin-bottom: 20px;
  }

  button {
    background-color: #ff6600;
    color: #fff;
    padding: 12px 24px;
    font-size: 16px;
    border: none;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
      background-color: #e65c00;
    }
  }
`;

const MembershipPage = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);

  const levels = [
    { id: 1, name: 'LV1', price: 50, benefits: ['Access to basic tasks', 'Standard commissions'] },
    { id: 2, name: 'LV2', price: 100, benefits: ['More tasks', 'Higher commissions'] },
    { id: 3, name: 'LV3', price: 200, benefits: ['Unlimited tasks', 'Premium commissions'] },
  ];

  const handleUpgrade = (level) => {
    setSelectedLevel(level.id);
    // TODO: Implement payment logic
    console.log('Upgraded to level:', level);
    // Navigate to dashboard or confirmation page
  };

  return (
    <Container>
      <Title>Upgrade Your Membership</Title>
      <LevelsContainer>
        {levels.map((level) => (
          <LevelCard key={level.id}>
            <FaCrown />
            <h3>{level.name}</h3>
            <p>Price: €{level.price}</p>
            <ul>
              {level.benefits.map((benefit, idx) => (
                <li key={idx}>{benefit}</li>
              ))}
            </ul>
            <button onClick={() => handleUpgrade(level)}>Upgrade</button>
          </LevelCard>
        ))}
      </LevelsContainer>
    </Container>
  );
};

export default MembershipPage;
