// src/components/ReferralPage.jsx
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../contexts/AuthContext';
import { FaLink, FaCopy } from 'react-icons/fa';

const Container = styled.div`
  padding: 40px 20px;
`;

const Title = styled.h2`
  color: #ff6600;
  margin-bottom: 20px;
`;

const ReferralLinkContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;

  input {
    flex: 1;
    padding: 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    margin-left: 10px;
    background-color: #ff6600;
    color: #fff;
    padding: 12px 16px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #e65c00;
    }
  }
`;

const StatsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StatCard = styled.div`
  flex: 1 1 200px;
  margin-right: 20px;
  margin-bottom: 20px;

  h3 {
    font-size: 18px;
    color: #333;
    margin-bottom: 5px;
  }

  p {
    font-size: 24px;
    color: #ff6600;
  }
`;

const ReferralPage = () => {
  const { authState } = useContext(AuthContext);
  const { user } = authState;
  const [copySuccess, setCopySuccess] = useState('');

  const referralLink = `${window.location.origin}/register?ref=${user.id}`; // Mock referral link

  const referralsCount = 3; // Mock data
  const referralIncome = 45.0; // Mock data

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopySuccess('Copied!');
    setTimeout(() => setCopySuccess(''), 2000);
  };

  return (
    <Container>
      <Title>Your Referral Link</Title>
      <ReferralLinkContainer>
        <input type="text" value={referralLink} readOnly />
        <button onClick={copyToClipboard}>
          <FaCopy /> {copySuccess ? copySuccess : 'Copy'}
        </button>
      </ReferralLinkContainer>
      <StatsContainer>
        <StatCard>
          <h3>Total Referrals</h3>
          <p>{referralsCount}</p>
        </StatCard>
        <StatCard>
          <h3>Referral Income</h3>
          <p>€{referralIncome.toFixed(2)}</p>
        </StatCard>
      </StatsContainer>
    </Container>
  );
};

export default ReferralPage;
