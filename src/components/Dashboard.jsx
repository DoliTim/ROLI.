// src/components/Dashboard.jsx
import React, { useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { FaTasks, FaUsers, FaWallet } from 'react-icons/fa';

const Container = styled.div`
  padding: 40px 20px;
`;

const Greeting = styled.h2`
  color: #ff6600;
  margin-bottom: 30px;
`;

const StatsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const StatCard = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 300px;
  padding: 20px;
  margin: 10px;
  text-align: center;

  svg {
    font-size: 40px;
    color: #ff6600;
    margin-bottom: 10px;
  }

  h3 {
    margin-bottom: 10px;
  }

  p {
    font-size: 18px;
    margin-bottom: 20px;
  }

  a {
    color: #ff6600;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Dashboard = () => {
  const { authState } = useContext(AuthContext);
  const { user } = authState;

  // Mock data
  const accountBalance = 100.0; // Replace with actual data
  const tasksCompleted = 5; // Replace with actual data
  const referrals = 3; // Replace with actual data

  return (
    <Container>
      <Greeting>Welcome back, {user.username}!</Greeting>
      <StatsContainer>
        <StatCard>
          <FaWallet />
          <h3>Account Balance</h3>
          <p>€{accountBalance.toFixed(2)}</p>
          <Link to="/tasks">Earn More</Link>
        </StatCard>
        <StatCard>
          <FaTasks />
          <h3>Tasks Completed</h3>
          <p>{tasksCompleted}</p>
          <Link to="/tasks">View Tasks</Link>
        </StatCard>
        <StatCard>
          <FaUsers />
          <h3>Referrals</h3>
          <p>{referrals}</p>
          <Link to="/referrals">Manage Referrals</Link>
        </StatCard>
      </StatsContainer>
    </Container>
  );
};

export default Dashboard;
