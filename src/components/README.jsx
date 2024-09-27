import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import tokenImage from '../assets/token.png'; // Import Roli token image
import clickSoundFile from '../assets/clickSound.mp3'; // Import click sound

// Styled Components

const Container = styled.div`
  padding: 60px 20px;
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(135deg, #1f1c2c, #928dab); /* Consistent futuristic background */
  min-height: 100vh;
  color: #fff;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 36px;
  margin-bottom: 20px;
  text-shadow: 0 0 10px rgba(255, 102, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff; /* White color for heading */
  
  /* Responsive Font Size */
  @media (max-width: 768px) {
    font-size: 32px;
  }

  svg {
    margin-right: 10px;
  }
`;

const OrangeDot = styled.span`
  color: #ff6600; /* Orange color for the dot */
`;

const RedDot = styled.span`
  color: #ff3333; /* Red color for the dot */
`;

const TokenImage = styled.img`
  width: ${({ large }) => (large ? '36px' : '18px')}; /* Larger token in the title */
  height: ${({ large }) => (large ? '36px' : '18px')};
  vertical-align: middle; /* Align token with text */
`;

const Section = styled.section`
  max-width: 1000px;
  margin: 0 auto 40px auto;
  line-height: 1.6;
`;

const Subtitle = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
  color: #ff6600;
  text-shadow: 0 0 5px rgba(255, 102, 0, 0.7);
`;

const Paragraph = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
  color: #ffffffcc;
`;

const JoinButton = styled.button`
  display: inline-block;
  margin: 40px auto 0 auto; /* Center the button */
  background-color: #ff6600;
  color: #fff;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s, transform 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #e65c00;
    transform: scale(1.05);
  }

  img {
    width: 18px; /* Match token size with text */
    height: 18px;
    margin-left: 5px;
  }
`;

// Custom component to handle Roli with dot and token image in text
const RoliText = ({ large = false }) => (
  <>
    Roli<OrangeDot>.</OrangeDot><TokenImage src={tokenImage} alt="Roli Token" large={large} />
  </>
);

const README = () => {
  const clickSound = new Audio(clickSoundFile); // Initialize click sound

  const playClickSound = () => {
    clickSound.play();
  };

  return (
    <Container>
      {/* Title Section */}
      <Title>
        <RoliText large={true} />
        <span style={{ marginLeft: '15px' }}>WORK MODEL</span>
      </Title>

      {/* Introduction Section */}
      <Section>
        <Subtitle>Introduction</Subtitle>
        <Paragraph>
          <RoliText /> is an innovative platform designed to empower users by providing opportunities to earn and manage <RoliText /> tokens. Our ecosystem is built around community engagement, rewarding active participation, and fostering a thriving network of users.
        </Paragraph>
      </Section>

      {/* How It Works Section */}
      <Section>
        <Subtitle>How It Works</Subtitle>
        <Paragraph>
          <RoliText /> operates on a multi-tiered referral system where users can earn tokens by inviting friends and building their network. Each generation of referrals contributes to your overall earnings, incentivizing continuous growth and engagement within the platform.
        </Paragraph>
        <Paragraph>
          Here's a breakdown of our referral generations:
        </Paragraph>
        <ul>
          <li><strong>Generation 1:</strong> Direct referrals you invite.</li>
          <li><strong>Generation 2:</strong> Referrals invited by your Generation 1 referrals.</li>
          <li><strong>Generation 3:</strong> Referrals invited by your Generation 2 referrals.</li>
        </ul>
      </Section>

      {/* Earning Mechanism Section */}
      <Section>
        <Subtitle>Earning Mechanism</Subtitle>
        <Paragraph>
          Users earn <RoliText /> tokens through various activities within the platform:
        </Paragraph>
        <ul>
          <li><strong>Referrals:</strong> Earn tokens for each successful referral across three generations.</li>
          <li><strong>Daily Engagement:</strong> Participate in daily tasks and challenges to accumulate tokens.</li>
          <li><strong>Achievements:</strong> Unlock rewards by reaching specific milestones and achievements.</li>
        </ul>
      </Section>

      {/* Managing Your Earnings Section */}
      <Section>
        <Subtitle>Managing Your Earnings</Subtitle>
        <Paragraph>
          <RoliText /> provides a user-friendly dashboard where you can track your daily and all-time earnings. Our platform ensures transparency and easy management of your tokens, allowing you to withdraw or reinvest them as per your preference.
        </Paragraph>
      </Section>

      {/* Security and Trust Section */}
      <Section>
        <Subtitle>Security and Trust</Subtitle>
        <Paragraph>
          We prioritize the security of our users. <RoliText /> employs advanced encryption and security protocols to safeguard your data and earnings. Our transparent system ensures that all transactions are secure and verifiable.
        </Paragraph>
      </Section>

      {/* Join the Roli Community Section */}
      <Section>
        <Subtitle>Join the <RoliText /> Community</Subtitle>
        <Paragraph>
          Become a part of the <RoliText /> community today. Engage with like-minded individuals, grow your network, and maximize your earnings through our innovative token system. Together, we can build a prosperous and dynamic ecosystem.
        </Paragraph>
      </Section>

      {/* Join Now Button */}
      <JoinButton onClick={playClickSound}>
        Become a Roli<RedDot>.</RedDot> Partner <TokenImage src={tokenImage} alt="Roli Token" />
      </JoinButton>
    </Container>
  );
};

export default README;
