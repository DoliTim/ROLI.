// src/components/SubscriptionPage.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  padding: 40px 20px;
  font-family: 'Poppins', sans-serif;
  padding-top: 80px; /* Adjust based on Navbar height */
`;

const Title = styled.h2`
  text-align: center;
  color: #ff6600;
  margin-bottom: 40px;
  font-weight: 600;
`;

const MembershipsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const MembershipCard = styled.div`
  flex: 1 1 300px;
  margin: 20px;
  padding: 30px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: ${(props) =>
    props.selected
      ? '0 4px 15px rgba(255, 102, 0, 0.3)'
      : '0 4px 15px rgba(0, 0, 0, 0.05)'};
  border: ${(props) => (props.selected ? '2px solid #ff6600' : 'none')};
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 15px rgba(255, 102, 0, 0.2);
  }

  h4 {
    font-size: 24px;
    margin-bottom: 20px;
    font-weight: 600;
    color: #ff6600;
  }

  p {
    font-size: 16px;
    color: #555;
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin-bottom: 20px;

    li {
      font-size: 16px;
      color: #666;
      margin-bottom: 8px;
    }
  }
`;

const SubscribeButton = styled.button`
  background-color: ${(props) => (props.disabled ? '#ccc' : '#ff6600')};
  color: #fff;
  padding: 16px 32px;
  font-size: 18px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  margin: 40px auto 0 auto;
  display: block;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.3s;
  width: 200px;

  &:hover {
    background-color: ${(props) => (props.disabled ? '#ccc' : '#e65c00')};
  }
`;

const SubscriptionPage = () => {
  const [selectedMembershipId, setSelectedMembershipId] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate function

  const memberships = [
    {
      id: 'associate',
      name: 'Associate',
      cost: 100,
      validity: 75,
      clicksPerDay: 4,
      rewardPerClick: 1,
    },
    {
      id: 'partner',
      name: 'Partner',
      cost: 300,
      validity: 75,
      clicksPerDay: 10,
      rewardPerClick: 1.6,
    },
    {
      id: 'senior_partner',
      name: 'Senior Partner',
      cost: 650,
      validity: 75,
      clicksPerDay: 20,
      rewardPerClick: 2,
    },
    {
      id: 'vip_member',
      name: 'VIP Member',
      cost: 1000,
      validity: 75,
      clicksPerDay: 30,
      rewardPerClick: 2.5,
    },
    {
      id: 'elite_member',
      name: 'Elite Member',
      cost: 2000,
      validity: 75,
      clicksPerDay: 40,
      rewardPerClick: 3,
    },
  ];

  const handleMembershipSelect = (membershipId) => {
    setSelectedMembershipId(membershipId);
  };

  const handleSubscribe = () => {
    if (selectedMembershipId) {
      const selectedMembership = memberships.find(
        (membership) => membership.id === selectedMembershipId
      );
      // Navigate to the PaymentPage and pass the selected membership data
      navigate('/payment', { state: { membership: selectedMembership } });
    }
  };

  return (
    <Container>
      <Title>Select a Membership Level</Title>
      <MembershipsContainer>
        {memberships.map((membership) => (
          <MembershipCard
            key={membership.id}
            onClick={() => handleMembershipSelect(membership.id)}
            selected={selectedMembershipId === membership.id}
          >
            <h4>{membership.name}</h4>
            <p>Cost: {membership.cost} Roli tokens</p>
            <ul>
              <li>Validity: {membership.validity} days</li>
              <li>Clicks per day: {membership.clicksPerDay}</li>
              <li>Reward per click: {membership.rewardPerClick} Roli tokens</li>
            </ul>
          </MembershipCard>
        ))}
      </MembershipsContainer>
      <SubscribeButton
        onClick={handleSubscribe}
        disabled={!selectedMembershipId}
      >
        {selectedMembershipId ? 'Subscribe Now' : 'Select a Membership'}
      </SubscribeButton>
    </Container>
  );
};

export default SubscriptionPage;
