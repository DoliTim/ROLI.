// src/components/ReferralTrackingPage.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 40px 20px;
`;

const Title = styled.h2`
  color: #ff6600;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
  }

  th {
    background-color: #ff6600;
    color: #fff;
  }
`;

const ReferralTrackingPage = () => {
  const [referrals, setReferrals] = useState([]);

  useEffect(() => {
    // Fetch referrals from API or use mock data
    setReferrals([
      { id: 1, username: 'user123', earnings: 15.0 },
      { id: 2, username: 'user456', earnings: 20.0 },
      { id: 3, username: 'user789', earnings: 10.0 },
    ]);
  }, []);

  return (
    <Container>
      <Title>Your Referrals</Title>
      <Table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Earnings</th>
          </tr>
        </thead>
        <tbody>
          {referrals.map((referral) => (
            <tr key={referral.id}>
              <td>{referral.username}</td>
              <td>€{referral.earnings.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ReferralTrackingPage;
