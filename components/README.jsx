// src/components/README.jsx
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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
  font-size: 48px;
  margin-bottom: 40px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ff6600;
  
  /* Responsive Font Size */
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const OrangeDot = styled.span`
  color: #ff6600; /* Orange color for the dot */
  margin: 0 8px;
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

const BackButton = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  background-color: #00c49f;
  color: #fff;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #00b894;
    transform: scale(1.05);
  }
`;

const README = () => {
  return (
    <Container>
      {/* Title Section */}
      <Title>
        <span>ROLI</span>
        <OrangeDot>.</OrangeDot>
        <span>WORK MODEL</span>
      </Title>

      {/* Introduction Section */}
      <Section>
        <Subtitle>Introduction</Subtitle>
        <Paragraph>
          Roli is an innovative platform designed to empower users by providing opportunities to earn and manage Roli tokens. Our ecosystem is built around community engagement, rewarding active participation, and fostering a thriving network of users.
        </Paragraph>
      </Section>

      {/* How It Works Section */}
      <Section>
        <Subtitle>How It Works</Subtitle>
        <Paragraph>
          Roli operates on a multi-tiered referral system where users can earn tokens by inviting friends and building their network. Each generation of referrals contributes to your overall earnings, incentivizing continuous growth and engagement within the platform.
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
          Users earn Roli tokens through various activities within the platform:
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
          Roli provides a user-friendly dashboard where you can track your daily and all-time earnings. Our platform ensures transparency and easy management of your tokens, allowing you to withdraw or reinvest them as per your preference.
        </Paragraph>
      </Section>

      {/* Security and Trust Section */}
      <Section>
        <Subtitle>Security and Trust</Subtitle>
        <Paragraph>
          We prioritize the security of our users. Roli employs advanced encryption and security protocols to safeguard your data and earnings. Our transparent system ensures that all transactions are secure and verifiable.
        </Paragraph>
      </Section>

      {/* Join the Roli Community Section */}
      <Section>
        <Subtitle>Join the Roli Community</Subtitle>
        <Paragraph>
          Become a part of the Roli community today. Engage with like-minded individuals, grow your network, and maximize your earnings through our innovative token system. Together, we can build a prosperous and dynamic ecosystem.
        </Paragraph>
      </Section>

      {/* Back to Home Button */}
      <BackButton to="/">← Back to Home</BackButton>
    </Container>
  );
};

export default README;
