import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import depositSoundFile from '../assets/depositSound.mp3'; // Import deposit sound
import clickSoundFile from '../assets/clickSound.mp3'; // Import click sound
import roliTokenImage from '../assets/token.png'; // Import Roli token image
import qrCodeImage from '../assets/qr.jpg'; // Import QR code image

// Global styles to ensure full black background with no white sides
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    background-color: #121212; /* Black background */
    color: #ffffff; /* White text */
    width: 100vw;
    height: 100vh;
    overflow-x: hidden; /* Prevent horizontal scroll and white space */
    font-family: 'Poppins', sans-serif;
  }

  #root {
    width: 100%;
    height: 100%;
  }
`;

const Title = styled.h2`
  text-align: center;
  color: #ff6600;
  margin-bottom: 20px;
  font-weight: 600;
`;

const CryptoAddress = styled.p`
  font-size: 18px;
  word-break: break-all;
  background-color: #1e1e1e; /* Darker background for the address */
  padding: 15px;
  border-radius: 8px;
  text-align: center;
`;

const CopyButton = styled.button`
  background-color: #ff6600;
  color: #fff;
  padding: 10px 20px;
  margin-top: 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    background-color: #e65c00;
  }
`;

const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  font-size: 16px;
  margin-bottom: 8px;
  color: #fff;
`;

const Input = styled.input`
  width: 80%;
  padding: 12px 15px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  background-color: #1e1e1e; /* Darker background for input fields */
  color: #fff;
  &:focus {
    border-color: #ff6600;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  background-color: #ff6600;
  color: #fff;
  padding: 14px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  width: 80%;
  &:hover {
    background-color: #e65c00;
  }
`;

// Styled component for Roli token image
const TokenImage = styled.img`
  width: 20px; /* Adjust size to match the text */
  height: 20px;
  margin-left: 5px;
  vertical-align: middle;
`;

// Styled component for Roli text with orange dot
const RoliText = styled.span`
  font-weight: 600;
  font-size: 16px;
  margin-left: 5px;

  &::after {
    content: '.';
    color: #ff6600; /* Orange dot */
  }
`;

// Styled component for QR Code Image (centered and with margin)
const QRImage = styled.img`
  margin: 20px auto;
  display: block;
  width: 200px;
  height: 200px;
  border-radius: 8px;
`;

const PaymentPage = () => {
  const location = useLocation();
  const { membership } = location.state || {};
  const [roliUserId, setRoliUserId] = useState('');
  const [depositPassword, setDepositPassword] = useState('');

  const cryptoAddress = '0x32D703aCF379a5bdAB008Aaaf7caf3f6CEf66717';

  // Initialize sounds
  const depositSound = new Audio(depositSoundFile);
  const clickSound = new Audio(clickSoundFile);

  const handleCopyAddress = () => {
    clickSound.play(); // Play click sound when the address is copied
    navigator.clipboard.writeText(cryptoAddress);
    alert('Crypto address copied to clipboard!');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!roliUserId || !depositPassword) {
      alert('Please enter both your Roli. user ID and deposit password.');
      return;
    }
    depositSound.play(); // Play deposit sound on submit
    alert(`Roli. user ID: ${roliUserId} and deposit password confirmed.`);
  };

  return (
    <>
      <GlobalStyle /> {/* Apply the global style for full black page */}
      <div style={{ padding: '40px 20px', width: '100%', height: '100%', textAlign: 'center' }}>
        <Title>Complete Your Subscription</Title>
        <p>
          You have selected the <strong>{membership?.name}</strong> membership.
        </p>
        <p>
          Please send <strong>{membership?.cost} USDT</strong> to the following crypto address to purchase{' '}
          <TokenImage src={roliTokenImage} alt="Roli Token" />
          <RoliText>Roli</RoliText> coins:
        </p>
        <CryptoAddress>{cryptoAddress}</CryptoAddress>

        {/* Centered QR Code Image */}
        <QRImage src={qrCodeImage} alt="QR Code" />

        {/* Copy Button with click sound */}
        <CopyButton onClick={handleCopyAddress}>Copy Address</CopyButton>

        <Form onSubmit={handleSubmit}>
          <Label htmlFor="roliUserId">Enter Your Roli. User ID</Label>
          <Input
            type="text"
            id="roliUserId"
            placeholder="Enter your Roli. user ID"
            value={roliUserId}
            onChange={(e) => setRoliUserId(e.target.value)}
            required
          />
          
          <Label htmlFor="depositPassword">Enter Your Deposit Password</Label>
          <Input
            type="password"
            id="depositPassword"
            placeholder="Enter your deposit password"
            value={depositPassword}
            onChange={(e) => setDepositPassword(e.target.value)}
            required
          />

          <SubmitButton type="submit">Confirm</SubmitButton>
        </Form>
      </div>
    </>
  );
};

export default PaymentPage;
