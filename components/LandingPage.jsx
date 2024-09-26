// src/components/LandingPage.jsx
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
} from 'react-icons/fa'; // Added new icons
import logoImage from '../assets/logo.png';
import roliheader from '../assets/roliheader.png'; // Import the new background image
import { useInView } from 'react-intersection-observer'; // Import useInView hook

// Styled Components

const LandingContainer = styled.div`
  font-family: 'Poppins', sans-serif;
  color: #333;
`;

// Header Styles
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

// Logo Container
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

// Logo Image
const LogoImage = styled.img`
  width: 40px; /* Adjust the size as needed */
  height: 40px;
  margin-right: 10px;
`;

// Logo Text
const LogoText = styled.h1`
  margin: 0;
  font-size: 24px;
  color: #ff6600;
  font-weight: 600;
`;

// Navigation Links
const NavLinks = styled.nav`
  a {
    color: #333;
    margin-left: 24px;
    text-decoration: none;
    font-size: 16px;
    font-weight: 500;
    transition: color 0.3s;

    &:hover {
      color: #ff6600;
    }
  }

  /* Responsive Design: Hide NavLinks on Mobile */
  @media (max-width: 768px) {
    display: none;
  }
`;

// Hero Section
const HeroSection = styled.section`
  background-image: url(${roliheader});
  background-size: cover;
  background-position: center;
  color: #ffffff;
  text-align: center;
  padding: 80px 20px; /* Reduced padding to move content higher */
  position: relative;
  font-family: 'Poppins', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Optional: Add a subtle overlay for better text readability */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4); /* Adjust opacity as needed */
    z-index: 0;
  }

  /* Adjust padding for smaller screens */
  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

// Hero Overlay (Additional Dark Overlay if Needed)
const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

// Hero Content
const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 800px;
  width: 100%;
`;

// Headline
const Headline = styled.h2`
  font-size: 48px;
  margin-bottom: 20px;
  font-weight: 600;
  margin-top: 10px; /* Further reduced margin to move higher */
  color: #ffffff;

  @media (max-width: 768px) {
    font-size: 32px;
    margin-top: 5px; /* Further reduced margin for smaller screens */
  }
`;

// SubHeadline (Static)
const SubHeadline = styled.p`
  font-size: 24px;
  margin-bottom: 40px;
  font-weight: 400;
  color: #ffffff;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

// CTA Button (Orange)
const CTAButton = styled(Link)`
  background-color: #ff6600; /* Orange color */
  color: #ffffff;
  padding: 16px 32px;
  text-decoration: none;
  font-size: 18px;
  font-weight: 600;
  border-radius: 8px;
  transition: background-color 0.3s;
  display: inline-block;

  &:hover {
    background-color: #e65c00; /* Darker orange on hover */
  }

  @media (max-width: 768px) {
    padding: 12px 24px;
    font-size: 16px;
  }
`;

// How It Works Button (Orange)
const HowItWorksButton = styled(Link)`
  background-color: #ff6600; /* Changed to orange */
  color: #ffffff;
  padding: 12px 25px;
  font-size: 18px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #e65c00; /* Darker orange on hover */
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 16px;
  }
`;

// General Section Styles
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

    @media (max-width: 768px) {
      font-size: 16px;
    }
  }

  ul {
    list-style-type: disc;
    padding-left: 40px;
    text-align: left;
    max-width: 800px;
    margin: 0 auto 40px auto;

    li {
      margin-bottom: 10px;
      font-size: 18px;
      color: #555;

      @media (max-width: 768px) {
        font-size: 16px;
      }
    }
  }
`;

// Features Container
const FeaturesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

// Individual Feature
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

    @media (max-width: 768px) {
      font-size: 20px;
    }
  }

  p {
    font-size: 16px;
    font-weight: 400;
    color: #666;

    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
`;

// Footer Styles
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

    @media (max-width: 768px) {
      font-size: 12px;
    }
  }
`;

// Main LandingPage Component
const LandingPage = () => {
  const controls = useAnimation(); // Controls for SubHeadline animation
  const [ref, inView] = useInView({
    threshold: 0.2, // Trigger when 20% of the component is visible
    triggerOnce: true, // Only trigger once
  });

  // Handle animation on scroll
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Handle animation on hover
  const handleHoverStart = () => {
    controls.start('visible');
  };

  const handleHoverEnd = () => {
    controls.start('hidden');
  };

  // Variants for SubHeadline
  const subHeadlineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <LandingContainer>
     

      {/* Hero Section */}
      <HeroSection onMouseEnter={handleHoverStart} onMouseLeave={handleHoverEnd}>
        <HeroOverlay />
        <HeroContent ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Headline>Unlock Exclusive Rewards</Headline>
            <SubHeadline
              variants={subHeadlineVariants}
              initial="hidden"
              animate={controls}
            >
              Engage with top apps and earn returns every day.
            </SubHeadline>
            <CTAButton to="/register">Join Now</CTAButton>
          </motion.div>
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
        {/* Added How It Works Button to this section */}
        <CTAButton to="/readme">How It Works</CTAButton>
      </Section>

      {/* Why Choose Our Platform Section */}
      <Section bgColor="#f9f9f9">
        <h3>Why Choose Our Platform</h3>
        <p>
          We bridge the gap between app developers and users by offering a platform where engagement is
          rewarded. Benefit from exclusive access to new apps and earn as you explore.
        </p>
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
        {/* Removed How It Works Button from here */}
        {/* <HowItWorksButton to="/readme">How It Works</HowItWorksButton> */}
      </Section>

      {/* Subscription Packages Section */}
      <Section>
        <h3>Subscription Packages</h3>
        <FeaturesContainer>
          <Feature>
            <h4>Associate</h4>
            <p>€50/100 Roli coins - Access to basic features and daily clicks.</p>
          </Feature>
          <Feature>
            <h4>Partner</h4>
            <p>€150/300 Roli coins - Increased daily clicks and higher returns.</p>
          </Feature>
          <Feature>
            <h4>Senior Partner</h4>
            <p>€325/650 Roli coins - Premium access with maximum daily clicks.</p>
          </Feature>
          {/* Add more packages as needed */}
        </FeaturesContainer>
        <CTAButton to="/subscription">View All Packages</CTAButton>
      </Section>

      {/* Footer */}
      <Footer>
        <p>&copy; {new Date().getFullYear()} Marketing Platform. All rights reserved.</p>
      </Footer>
    </LandingContainer>
  );
};

export default LandingPage;
