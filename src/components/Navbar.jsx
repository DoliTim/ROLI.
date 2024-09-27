import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTimes, FaTelegramPlane } from 'react-icons/fa'; // Import Telegram icon
import logoImage from '../assets/logo.png';
import tokenImage from '../assets/token.png'; // Import Roli token image
import clickSoundFile from '../assets/clickSound.mp3'; // Click sound for links
import roliSoundFile from '../assets/roliSound.mp3'; // Import the roli sound

// Styled Components
const Header = styled.header`
  background-color: #000000; /* Set navbar background to black */
  padding: 20px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(255, 255, 255, 0.1); /* Light shadow for contrast */
`;

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const LogoImage = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const LogoText = styled.h1`
  margin: 0;
  font-size: 24px;
  color: #ffffff; /* Roli text in white */
  font-weight: 600;

  &::after {
    content: '.';
    color: #ff6600; /* Orange dot */
  }
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }

  a {
    color: #ffffff; /* White text for links */
    margin-left: 24px;
    text-decoration: none;
    font-size: 16px;
    font-weight: 500;
    transition: color 0.3s;

    &:hover {
      color: #ff6600; /* Orange hover effect */
    }
  }
`;

const MyRoliLink = styled(Link)`
  display: flex;
  align-items: center;
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  margin-left: 24px;
  text-decoration: none;

  &:hover {
    color: #ff6600;
  }

  span {
    margin-right: 5px;
  }

  img {
    width: 18px;
    height: 18px;
    margin-left: 5px; /* Space between text and token image */
  }
`;

const Hamburger = styled.div`
  display: none;
  color: #ff6600;
  font-size: 24px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
  width: 60%;
  height: 100vh;
  background-color: #000000; /* Set mobile menu background to black */
  box-shadow: -2px 0 4px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease-in-out;
  z-index: 99;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const CloseIcon = styled.div`
  align-self: flex-end;
  color: #ff6600;
  font-size: 24px;
  cursor: pointer;
`;

const MobileNavLinks = styled.nav`
  display: flex;
  flex-direction: column;
  margin-top: 40px;

  a {
    color: #ffffff; /* White text for mobile links */
    margin: 16px 0;
    text-decoration: none;
    font-size: 18px;
    font-weight: 500;
    transition: color 0.3s;

    &:hover {
      color: #ff6600; /* Orange hover effect for mobile links */
    }
  }
`;

const TelegramIcon = styled(FaTelegramPlane)`
  color: #ffffff;
  font-size: 24px;
  margin-left: 24px;
  transition: color 0.3s;
  cursor: pointer;

  &:hover {
    color: #ff6600; /* Orange hover effect for Telegram icon */
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const clickSound = new Audio(clickSoundFile); // Initialize click sound
  const roliSound = new Audio(roliSoundFile); // Initialize roli sound

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const playClickSound = () => {
    clickSound.play();
  };

  const playRoliSound = () => {
    roliSound.play();
  };

  return (
    <>
      <Header>
        {/* Play roli sound when clicking on the logo or the text */}
        <LogoContainer to="/" onClick={playRoliSound}>
          <LogoImage src={logoImage} alt="Logo" />
          <LogoText>Roli</LogoText>
        </LogoContainer>
        <NavLinks>
          <Link to="/register" onClick={playClickSound}>Register</Link>
          <Link to="/signin" onClick={playClickSound}>Sign In</Link>
          {/* Updated My Roli link with the token image */}
          <MyRoliLink to="/teams" onClick={playClickSound}>
            <span>My Roli</span>
            <img src={tokenImage} alt="Roli Token" />
          </MyRoliLink>
          <Link to="/readme" onClick={playClickSound}>Read More</Link>
          <Link to="/subscription" onClick={playClickSound}>Subscription</Link>
          <Link to="/engagement" onClick={playClickSound}>Engagement</Link>
          {/* Add Telegram icon linking to Telegram chat */}
          <a href="https://t.me/+_89dAvE-_QJhOTI0" target="_blank" rel="noopener noreferrer">
            <TelegramIcon />
          </a>
        </NavLinks>
        <Hamburger onClick={toggleMenu} aria-label="Menu" aria-expanded={isOpen}>
          <FaBars />
        </Hamburger>
      </Header>

      <MobileMenu isOpen={isOpen}>
        <CloseIcon onClick={toggleMenu} aria-label="Close Menu">
          <FaTimes />
        </CloseIcon>
        <MobileNavLinks>
          <Link to="/register" onClick={() => { closeMenu(); playClickSound(); }}>Register</Link>
          <Link to="/signin" onClick={() => { closeMenu(); playClickSound(); }}>Sign In</Link>
          <Link to="/teams" onClick={() => { closeMenu(); playClickSound(); }}>My Roli</Link>
          <Link to="/readme" onClick={() => { closeMenu(); playClickSound(); }}>Read More</Link>
          <Link to="/subscription" onClick={() => { closeMenu(); playClickSound(); }}>Subscription</Link>
          <Link to="/engagement" onClick={() => { closeMenu(); playClickSound(); }}>Engagement</Link>
          {/* Add Telegram icon linking to Telegram chat in mobile menu */}
          <a href="https://t.me/+_89dAvE-_QJhOTI0" target="_blank" rel="noopener noreferrer">
            <TelegramIcon />
          </a>
        </MobileNavLinks>
      </MobileMenu>
    </>
  );
};

export default Navbar;
