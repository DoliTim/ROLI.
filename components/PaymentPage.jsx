// src/components/PaymentPage.jsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: 40px 20px;
  font-family: 'Poppins', sans-serif;
  max-width: 600px;
  margin: 0 auto;
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
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
`;

const CopyButton = styled.button`
  background-color: #ff6600;
  color: #fff;
  padding: 10px 20px;
  margin-top: 10px;
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
`;

const Label = styled.label`
  display: block;
  font-size: 16px;
  margin-bottom: 8px;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
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
  width: 100%;
  &:hover {
    background-color: #e65c00;
  }
`;

const PaymentPage = () => {
  const location = useLocation();
  const { membership } = location.state || {};
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSet, setPasswordSet] = useState(false);

  const cryptoAddress = 'YOUR_CRYPTO_ADDRESS_HERE';

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(cryptoAddress);
    alert('Crypto address copied to clipboard!');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    // Save the password securely (implement backend API call)
    setPasswordSet(true);
    alert('Withdrawal password set successfully.');
  };

  return (
    <Container>
      <Title>Complete Your Subscription</Title>
      <p>
        You have selected the <strong>{membership?.name}</strong> membership.
      </p>
      <p>
        Please send <strong>{membership?.cost} USDT</strong> to the following crypto address to purchase Roli coins:
      </p>
      <CryptoAddress>{cryptoAddress}</CryptoAddress>
      <CopyButton onClick={handleCopyAddress}>Copy Address</CopyButton>

      <Form onSubmit={handleSubmit}>
        <Label htmlFor="password">Set Withdrawal Password</Label>
        <Input
          type="password"
          id="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          type="password"
          id="confirmPassword"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <SubmitButton type="submit">Set Password</SubmitButton>
      </Form>
    </Container>
  );
};

export default PaymentPage;
