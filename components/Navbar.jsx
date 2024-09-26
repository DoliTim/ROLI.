// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import hamburger and close icons
import logoImage from '../assets/logo.png';

// Styled Components

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
const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none; /* Remove underline from link */
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

// Navigation Links Container
const NavLinks = styled.nav`
  display: flex;
  align-items: center;

  /* Hide nav links on mobile */
  @media (max-width: 768px) {
    display: none;
  }

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
`;

// Hamburger Icon
const Hamburger = styled.div`
  display: none;
  color: #ff6600;
  font-size: 24px;
  cursor: pointer;

  /* Show hamburger on mobile */
  @media (max-width: 768px) {
    display: block;
  }
`;

// Mobile Menu Overlay
const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
  width: 60%;
  height: 100vh;
  background-color: #ffffff;
  box-shadow: -2px 0 4px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease-in-out;
  z-index: 99;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

// Close Icon
const CloseIcon = styled.div`
  align-self: flex-end;
  color: #ff6600;
  font-size: 24px;
  cursor: pointer;
`;

// Mobile Navigation Links
const MobileNavLinks = styled.nav`
  display: flex;
  flex-direction: column;
  margin-top: 40px;

  a {
    color: #333;
    margin: 16px 0;
    text-decoration: none;
    font-size: 18px;
    font-weight: 500;
    transition: color 0.3s;

    &:hover {
      color: #ff6600;
    }
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle Mobile Menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when a link is clicked
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Header>
        <LogoContainer to="/">
          <LogoImage src={logoImage} alt="Logo" />
          <LogoText>Roli.</LogoText>
        </LogoContainer>
        <NavLinks>
          <Link to="/register">Register</Link>
          <Link to="/signin">Sign In</Link>
          <Link to="/teams">Teams</Link>
          <Link to="/readme">Read More</Link> {/* Added Read More Link */}
          <Link to="/subscription">Subscription</Link>
          <Link to="/engagement">Engagement</Link>
        </NavLinks>
        <Hamburger onClick={toggleMenu} aria-label="Menu" aria-expanded={isOpen}>
          <FaBars />
        </Hamburger>
      </Header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isOpen}>
        <CloseIcon onClick={toggleMenu} aria-label="Close Menu">
          <FaTimes />
        </CloseIcon>
        <MobileNavLinks>
          <Link to="/register" onClick={closeMenu}>Register</Link>
          <Link to="/signin" onClick={closeMenu}>Sign In</Link>
          <Link to="/teams" onClick={closeMenu}>Teams</Link>
          <Link to="/readme" onClick={closeMenu}>Read More</Link>
          <Link to="/subscription" onClick={closeMenu}>Subscription</Link>
          <Link to="/engagement" onClick={closeMenu}>Engagement</Link>
        </MobileNavLinks>
      </MobileMenu>
    </>
  );
};

export default Navbar;
