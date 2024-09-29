import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import styled from 'styled-components';
import {
  FaHandshake,
  FaMobileAlt,
  FaGift,
  FaUsers,
  FaShareAlt,
  FaChartLine,
  FaStar,
  FaMedal,
  FaCrown
} from 'react-icons/fa';
import logoImage from '../assets/logo.png';
import roliheader from '../assets/roliheader.png';
import clickSoundFile from '../assets/clickSound.mp3'; // Import the click sound
import { useInView } from 'react-intersection-observer';
import roliTokenImage from '../assets/token.png'; // Import the Roli token image

// Styled Components

// Styled component for Roli text with an orange dot
const RoliText = styled.span`
  margin-left: 10px; /* Added spacing between token and "Roli." */
  font-weight: 600;
  font-size: 16px;

  /* Orange dot for "Roli." */
  &::after {
    content: '.';
    color: #ff6600; /* Orange dot */
  }
`;

// Styled component for Roli token image
const TokenImage = styled.img`
  width: 18px; /* Adjust the size of the token */
  height: 18px;
  margin-left: 5px; /* Space between number and image */
  vertical-align: middle; /* Align the token with the text */
`;

const LandingContainer = styled.div`
  font-family: 'Poppins', sans-serif;
  color: #ffffff;
  background-color: #000000; /* Set background to black */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.header`
  background-color: #1e1e1e;
  padding: 20px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(255, 255, 255, 0.1);
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 40px;
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
    color: #ffffff;
    margin-left: 24px;
    text-decoration: none;
    font-size: 16px;
    font-weight: 500;
    transition: color 0.3s;

    &:hover {
      color: #ff6600;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const HeroSection = styled.section`
  background-image: url(${roliheader});
  background-size: cover;
  background-position: center;
  width: 100vw; /* Full width */
  height: 90vh; /* Reduced height to 90% */
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
`;


const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* Dark overlay for readability */
  z-index: 0;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center content horizontally */
  justify-content: center; /* Center content vertically */
  text-align: center; /* Center text */
  height: 150%;
  padding: 40px;
`;

const TopLeftText = styled(motion.div)`
  font-size: 48px;
  font-weight: 700;
  color: #ffffff;

  &::after {
    content: '.';
    color: #ff6600; /* Orange dot */
  }
`;

const BottomRightText = styled(motion.p)`
  font-size: 24px;
  font-weight: 400;
  color: #ffffff;
  margin-top: 20px; /* Add space between text and button */
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
  display: inline-block;
  margin-top: 20px;

  &:hover {
    background-color: #e65c00;
  }

  @media (max-width: 768px) {
    padding: 12px 24px;
    font-size: 16px;
  }
`;

const Section = styled.section`
  padding: 80px 20px;
  text-align: center;
  background-color: ${(props) => props.bgColor || 'transparent'}; /* Transparent background to match gradient */

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
    color: #dddddd;

    @media (max-width: 768px) {
      font-size: 16px;
    }
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
  background-color: #1e1e1e;
  border-radius: 8px;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-10px);
  }

  svg {
    font-size: 48px;
    color: #ff6600;
    margin-bottom: 20px;
  }

  h4 {
    font-size: 24px;
    margin-bottom: 10px;
    font-weight: 600;
    color: #ffffff;

    @media (max-width: 768px) {
      font-size: 20px;
    }
  }

  p {
    font-size: 16px;
    font-weight: 400;
    color: #dddddd;

    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
`;

const Footer = styled.footer`
  background-color: #1e1e1e;
  color: #ffffff;
  text-align: center;
  padding: 40px 20px;
  margin-top: 40px;

  p {
    margin: 0;
    font-size: 14px;
    font-weight: 400;

    @media (max-width: 768px) {
      font-size: 12px;
    }
  }
`;

const LandingPage = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  // Initialize click sound
  const clickSound = new Audio(clickSoundFile);

  // Play click sound
  const playClickSound = () => {
    clickSound.play();
  };

  // Handle animation on scroll
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <LandingContainer>
      {/* Full-Screen Hero Section */}
      <HeroSection>
        <HeroOverlay />
        <HeroContent ref={ref}>
          <TopLeftText
            initial={{ x: '-100vw', opacity: 0 }} // Start from the left outside of view
            animate={{ x: 0, opacity: 1 }} // Slide in from the left
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            Roli
          </TopLeftText>
          <BottomRightText
            initial={{ x: '100vw', opacity: 0 }} // Start from the right outside of view
            animate={{ x: 0, opacity: 1 }} // Slide in from the right
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            the Future of App Engagement
          </BottomRightText>
          <BottomRightText
            initial={{ x: '100vw', opacity: 0 }} // Start from the right outside of view
            animate={{ x: 0, opacity: 1 }} // Slide in from the right
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            Unlock Exclusive Rewards, Engage with top apps and earn returns every day.
          </BottomRightText>
          <CTAButton to="/register" onClick={playClickSound}>
            Join Now
          </CTAButton>
        </HeroContent>
      </HeroSection>

      {/* How It Works Section */}
      <Section>
        <h3>How It Works</h3>
        <FeaturesContainer>
          <Feature>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
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
              viewport={{ once: true }}
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
              viewport={{ once: true }}
            >
              <FaGift />
              <h4>Earn</h4>
              <p>Receive returns for every click based on your subscription level.</p>
            </motion.div>
          </Feature>
        </FeaturesContainer>
        <CTAButton to="/readme" onClick={playClickSound}>
          How It Works
        </CTAButton>
      </Section>

  {/* Team Collaboration and Referral Section */}
<Section>
  <h3>Boost Your Earnings with Teamwork</h3>
  <p>
    Collaborate with others and take advantage of our referral program to maximize your rewards.
    Share the benefits of our platform with friends and grow together.
  </p>
  <FeaturesContainer>
    <Feature>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <FaUsers />
        <h4>Team Collaboration</h4>
        <p>Work together to share strategies and achieve common goals.</p>
      </motion.div>
    </Feature>
    <Feature>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <FaShareAlt />
        <h4>Direct Referrals</h4>
        <p>Invite friends directly and earn rewards when they join.</p>
      </motion.div>
    </Feature>
    <Feature>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <FaChartLine />
        <h4>Increase Earnings</h4>
        <p>Boost your income through collaboration and direct referrals.</p>
      </motion.div>
    </Feature>
  </FeaturesContainer>
  
  {/* Add the button for Roli Referral Program */}
  <CTAButton to="/referral" onClick={playClickSound}>
    Roli. Token Referral Program
  </CTAButton>
</Section>

  {/* Subscription Packages Section */}
  <Section>
    <h3>Subscription Packages</h3>
    <FeaturesContainer>
      <Feature>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <FaStar /> {/* Icon for Associate */}
          <h4>Associate</h4>
          <p>
            €50/100 
            <TokenImage src={roliTokenImage} alt="Roli Token" /> 
            <RoliText>Roli</RoliText> coins - Access to basic features and daily clicks.
          </p>
        </motion.div>
      </Feature>
      <Feature>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <FaMedal /> {/* Icon for Partner */}
          <h4>Partner</h4>
          <p>
            €150/300 
            <TokenImage src={roliTokenImage} alt="Roli Token" /> 
            <RoliText>Roli</RoliText> coins - Increased daily clicks and higher returns.
          </p>
        </motion.div>
      </Feature>
      <Feature>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <FaCrown /> {/* Icon for Senior Partner */}
          <h4>Senior Partner</h4>
          <p>
            €325/650 
            <TokenImage src={roliTokenImage} alt="Roli Token" /> 
            <RoliText>Roli</RoliText> coins - Premium access with maximum daily clicks.
          </p>
        </motion.div>
      </Feature>
    </FeaturesContainer>
    <CTAButton to="/subscription" onClick={playClickSound}>
      View All Packages
    </CTAButton>
  </Section>

      {/* Footer */}
      <Footer>
        <p>&copy; {new Date().getFullYear()} Marketing Platform. All rights reserved.</p>
      </Footer>
    </LandingContainer>
  );
};

export default LandingPage;
