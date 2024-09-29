import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import roliTokenImage from '../assets/token.png'; // Import Roli token image
import clickSoundFile from '../assets/clickSound.mp3'; // Import click sound
import authSoundFile from '../assets/authSound.mp3'; // Import auth sound
import { FaUserTie, FaUserPlus, FaCrown, FaStar, FaGem } from 'react-icons/fa'; // Import icons

// Styled component for Roli token image
const TokenImage = styled.img`
  width: 21.6px; /* Adjust size to match the text */
  height: 21.6px;
  margin-left: 5px;
  vertical-align: middle;
`;

// Styled component for Roli text with orange dot
const RoliText = styled.span`
  margin-left: 10px; /* Space between token and Roli text */
  font-weight: 600;
  font-size: 16px;

  /* Orange dot for Roli */
  &::after {
    content: '.';
    color: #ff6600; /* Orange dot */
  }
`;

// Container styles for dark theme with full black background
const Container = styled.div`
  padding: 40px 20px;
  font-family: 'Poppins', sans-serif;
  padding-top: 80px; /* Adjust based on Navbar height */
  background-color: #121212; /* Dark background */
  color: #ffffff; /* White text */
  min-height: 100vh; /* Ensure full height */
  display: flex;
  flex-direction: column;
`;

// Ensuring bottom of screen is black
const Wrapper = styled.div`
  flex-grow: 1;
  background-color: #121212; /* Full black background */
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
  background-color: #1e1e1e; /* Darker card background */
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
    color: #ddd; /* Light text color for dark background */
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin-bottom: 20px;

    li {
      font-size: 16px;
      color: #bbb; /* Light gray for list items */
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

// Membership icons for each subscription level
const membershipIcons = {
  associate: <FaUserTie size={32} color="#ff6600" />, // Icon for associate
  partner: <FaUserPlus size={32} color="#ff6600" />, // Icon for partner
  senior_partner: <FaCrown size={32} color="#ff6600" />, // Icon for senior partner
  vip_member: <FaStar size={32} color="#ff6600" />, // Icon for VIP member
  elite_member: <FaGem size={32} color="#ff6600" />, // Icon for elite member
};

const SubscriptionPage = () => {
  const [selectedMembershipId, setSelectedMembershipId] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate function

  // Initialize click and auth sounds
  const clickSound = new Audio(clickSoundFile);
  const authSound = new Audio(authSoundFile);

  const memberships = [
    {
      id: 'associate',
      name: 'Associate',
      cost: 100,
      validity: 30,
      clicksPerDay: 4,
      rewardPerClick: 1,
      description: 'Basic membership with access to limited features and rewards.',
    },
    {
      id: 'partner',
      name: 'Partner',
      cost: 500,
      validity: 75,
      clicksPerDay: 10,
      rewardPerClick: 1.5,
      description: 'Partner level with enhanced rewards and more clicks per day.',
    },
    {
      id: 'senior_partner',
      name: 'Senior Partner',
      cost: 1000,
      validity: 75,
      clicksPerDay: 20,
      rewardPerClick: 2,
      description: 'Senior Partner level with better daily rewards and clicks.',
    },
    {
      id: 'vip_member',
      name: 'VIP Member',
      cost: 2000,
      validity: 75,
      clicksPerDay: 40,
      rewardPerClick: 2.5,
      description: 'Exclusive VIP membership with top-tier rewards and features.',
    },
    {
      id: 'elite_member',
      name: 'Elite Member',
      cost: 5000,
      validity: 75,
      clicksPerDay: 50,
      rewardPerClick: 3,
      description: 'Elite membership with the highest rewards and privileges.',
    },
  ];

  const handleMembershipSelect = (membershipId) => {
    clickSound.play(); // Play click sound on card select
    setSelectedMembershipId(membershipId);
  };

  const handleSubscribe = () => {
    if (selectedMembershipId) {
      authSound.play(); // Play auth sound on subscribe
      const selectedMembership = memberships.find(
        (membership) => membership.id === selectedMembershipId
      );

      // Only pass serializable data to navigate
      const membershipData = {
        id: selectedMembership.id,
        name: selectedMembership.name,
        cost: selectedMembership.cost,
        validity: selectedMembership.validity,
        clicksPerDay: selectedMembership.clicksPerDay,
        rewardPerClick: selectedMembership.rewardPerClick,
        description: selectedMembership.description, // Pass the description too
      };

      // Navigate to PaymentPage with serializable data
      navigate('/payment', { state: { membership: membershipData } });
    }
  };

  return (
    <Wrapper>
      <Container>
        <Title>Select a Membership Level</Title>
        <MembershipsContainer>
          {memberships.map((membership) => (
            <MembershipCard
              key={membership.id}
              onClick={() => handleMembershipSelect(membership.id)}
              selected={selectedMembershipId === membership.id}
            >
              {/* Display the icon based on the membership level */}
              {membershipIcons[membership.id]}
              <h4>{membership.name}</h4>
              <p>
                Cost: {membership.cost}{' '}
                <TokenImage src={roliTokenImage} alt="Roli Token" />
                <RoliText>Roli</RoliText> tokens
              </p>
              <ul>
                <li>Validity: {membership.validity} days</li>
                <li>Clicks per day: {membership.clicksPerDay}</li>
                <li>
                  Reward per click: {membership.rewardPerClick}{' '}
                  <TokenImage src={roliTokenImage} alt="Roli Token" />
                  <RoliText>Roli</RoliText> tokens
                </li>
              </ul>
              <p>{membership.description}</p>
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
    </Wrapper>
  );
};

export default SubscriptionPage;
