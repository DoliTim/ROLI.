// src/components/Clickable.jsx
import React from 'react';
import styled from 'styled-components';
import clickSoundFile from '../assets/clickSound.mp3'; // Ensure the path is correct

// Styled Component Wrapper
const StyledClickable = styled.div`
  display: inline-block;
  cursor: pointer;
`;

const Clickable = ({ children, onClick, ...rest }) => {
  const clickSound = new Audio(clickSoundFile);

  const handleClick = (e) => {
    clickSound.currentTime = 0; // Rewind to start
    clickSound.play();
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <StyledClickable onClick={handleClick} {...rest}>
      {children}
    </StyledClickable>
  );
};

export default Clickable;
