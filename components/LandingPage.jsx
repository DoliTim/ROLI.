// src/components/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaHandshake, FaMobileAlt, FaGift } from 'react-icons/fa';
import logoImage from '../assets/logo.png';

const LandingContainer = styled.div`
  font-family: 'Poppins', sans-serif;
  color: #333;
`;

const Header = styled.header`
  background-color: #ffffff;
  padding: 20px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// New styled components for the logo
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 40px; /* Adjust the size as needed */
  height: 40px;
  margin-right: 10px;
`;

const LogoText = styled.h1`
  margin: 0;
  font-size: 24px;
  color: #ff6600;
  font-weight: 600;
`;

const NavLinks = styled.nav`
  a {
    color: #333;
    margin-left: 24px;
    text-decoration: none;
    font-size: 16px;
    font-weight: 500;
    &:hover {
      color: #ff6600;
    }
  }
`;

const HeroSection = styled.section`
  background-image: url('https://source.unsplash.com/1600x900/?technology,marketing');
  background-size: cover;
  background-position: center;
  color: #ffffff;
  text-align: center;
  padding: 160px 20px;
  position: relative;
  font-family: 'Poppins', sans-serif;
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
`;

const Headline = styled.h2`
  font-size: 48px;
  margin-bottom: 20px;
  font-weight: 600;
`;

const SubHeadline = styled.p`
  font-size: 24px;
  margin-bottom: 40px;
  font-weight: 400;
`;

const CTAButton = styled(Link)`
  background-color: #ff6600;
  color: #ffffff;
  padding: 16px 32px;
  text-decoration: none;
  font-size: 18px;
  font-weight: 600;
  border-radius: 8px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #e65c00;
  }
`;

const Section = styled.section`
  padding: 80px 20px;
  text-align: center;
  background-color: ${(props) => props.bgColor || '#ffffff'};
  font-family: 'Poppins', sans-serif;

  h3 {
    font-size: 32px;
    margin-bottom: 40px;
    color: #ff6600;
    font-weight: 600;
  }

  p {
    font-size: 18px;
    max-width: 800px;
    margin: 0 auto 40px auto;
    font-weight: 400;
    color: #555;
  }
`;

const FeaturesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Feature = styled.div`
  flex: 1 1 300px;
  margin: 20px;
  padding: 20px;
  text-align: center;

  svg {
    font-size: 48px;
    color: #ff6600;
    margin-bottom: 20px;
  }

  h4 {
    font-size: 24px;
    margin-bottom: 10px;
    font-weight: 600;
  }

  p {
    font-size: 16px;
    font-weight: 400;
    color: #666;
  }
`;

const Footer = styled.footer`
  background-color: #1e1e1e;
  color: #ffffff;
  text-align: center;
  padding: 40px 20px;
  margin-top: 40px;
  font-family: 'Poppins', sans-serif;

  p {
    margin: 0;
    font-size: 14px;
    font-weight: 400;
  }
`;

const LandingPage = () => (
  <LandingContainer>
    <Header>
      <LogoContainer>
        <LogoImage src={logoImage} alt="Logo" />
        <LogoText>Roli.</LogoText>
      </LogoContainer>
      <NavLinks>
        <Link to="/register">Register</Link>
        <Link to="/signin">Sign In</Link>
      </NavLinks>
    </Header>

    <HeroSection>
      <HeroOverlay />
      <HeroContent>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Headline>Unlock Exclusive Rewards</Headline>
          <SubHeadline>Engage with top apps and earn returns every day.</SubHeadline>
          <CTAButton to="/register">Join Now</CTAButton>
        </motion.div>
      </HeroContent>
    </HeroSection>

    <Section>
      <h3>How It Works</h3>
      <FeaturesContainer>
        <Feature>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FaHandshake />
            <h4>Subscribe</h4>
            <p>Choose from seven subscription packages starting at €150.</p>
          </motion.div>
        </Feature>
        <Feature>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <FaMobileAlt />
            <h4>Engage</h4>
            <p>Interact with a selection of apps daily and make the most of your clicks.</p>
          </motion.div>
        </Feature>
        <Feature>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <FaGift />
            <h4>Earn</h4>
            <p>Receive returns for every click based on your subscription level.</p>
          </motion.div>
        </Feature>
      </FeaturesContainer>
    </Section>

    <Section bgColor="#f9f9f9">
      <h3>Why Choose Our Platform</h3>
      <p>
        We bridge the gap between app developers and users by offering a platform where engagement is
        rewarded. Benefit from exclusive access to new apps and earn as you explore.
      </p>
    </Section>

    <Section>
      <h3>Subscription Packages</h3>
      <FeaturesContainer>
        <Feature>
          <h4>Package 1</h4>
          <p>€150 - Access to basic features and daily clicks.</p>
        </Feature>
        <Feature>
          <h4>Package 2</h4>
          <p>€500 - Increased daily clicks and higher returns.</p>
        </Feature>
        <Feature>
          <h4>Package 3</h4>
          <p>€1,000 - Premium access with maximum daily clicks.</p>
        </Feature>
        {/* Add more packages as needed */}
      </FeaturesContainer>
      <CTAButton to="/subscription">View All Packages</CTAButton>
    </Section>

    <Footer>
      <p>&copy; {new Date().getFullYear()} Marketing Platform. All rights reserved.</p>
    </Footer>
  </LandingContainer>
);

export default LandingPage;
