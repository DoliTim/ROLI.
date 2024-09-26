// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logoImage from '../assets/logo.png';

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

const Navbar = () => (
  <Header>
    <LogoContainer to="/">
      <LogoImage src={logoImage} alt="Logo" />
      <LogoText>Roli.</LogoText>
    </LogoContainer>
    <NavLinks>
      <Link to="/register">Register</Link>
      <Link to="/signin">Sign In</Link>
    </NavLinks>
  </Header>
);

export default Navbar;
