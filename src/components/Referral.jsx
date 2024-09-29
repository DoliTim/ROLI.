import React, { useState } from 'react';
import styled from 'styled-components';
import { FaMedal, FaTrophy, FaCrown, FaStar, FaUserFriends } from 'react-icons/fa';
import roliTokenImage from '../assets/token.png'; // Import the Roli token image

// Styled components for referral page
const Container = styled.div`
  padding: 40px 20px;
  font-family: 'Poppins', sans-serif;
  background-color: #121212;
  color: #ffffff;
  min-height: 100vh;
`;

const Title = styled.h2`
  text-align: center;
  color: #ff6600;
  margin-bottom: 40px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Styled component for the Roli logo with token
const TokenImage = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 5px;
  vertical-align: middle;
`;

const RoliText = styled.span`
  font-weight: 600;
  font-size: 24px;
  margin-left: 10px;

  &::after {
    content: '.';
    color: #ff6600;
  }
`;

const ReferralInfo = styled.div`
  margin-bottom: 20px;
  background-color: #1e1e1e;
  padding: 20px;
  border-radius: 12px;
`;

const ReferralText = styled.p`
  font-size: 16px;
  margin-bottom: 15px;
  color: #ccc;
`;

const RewardItem = styled.li`
  font-size: 16px;
  color: #bbb;
  margin-bottom: 10px;
`;

const BonusSection = styled.div`
  background-color: #1e1e1e;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
`;

const BonusTitle = styled.h3`
  color: #ff6600;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 600;
`;

const BonusList = styled.ul`
  list-style: none;
  padding: 0;
`;

const RankSection = styled.div`
  background-color: #1e1e1e;
  padding: 20px;
  border-radius: 12px;
  margin-top: 20px;
`;

const RankItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #292929;
  margin-bottom: 10px;
  border-radius: 8px;
`;

const RankText = styled.div`
  font-size: 16px;
  color: #fff;
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
  }
`;

const Referral = () => {
  const [referralCount, setReferralCount] = useState(0);

  // Referral tiers
  const referralTiers = [
    {
      tier: 'Beginner',
      referrals: '1-5 Referrals',
      reward: 'Basic rewards',
      icon: <FaMedal size={24} color="#ff6600" />,
    },
    {
      tier: 'Intermediate',
      referrals: '6-20 Referrals',
      reward: '10% boost on all referral rewards',
      icon: <FaStar size={24} color="#ff6600" />,
    },
    {
      tier: 'Advanced',
      referrals: '21-50 Referrals',
      reward: '20% boost + 50 bonus tokens for every 10 referrals',
      icon: <FaTrophy size={24} color="#ff6600" />,
    },
    {
      tier: 'Elite',
      referrals: '51+ Referrals',
      reward: '30% boost + priority support + beta access',
      icon: <FaCrown size={24} color="#ff6600" />,
    },
  ];

  return (
    <Container>
      <Title>
        <TokenImage src={roliTokenImage} alt="Roli Token" />
        <RoliText>Roli Referral Program</RoliText>
      </Title>
      <ReferralInfo>
        <ReferralText>
          Our 3-generation referral system lets you earn Roli tokens from not just your direct
          recruits but also from their networks!
        </ReferralText>
        <ul>
          <RewardItem>
            <FaUserFriends size={18} color="#ff6600" /> 1st Generation Referral: 3 Roli tokens 
            <TokenImage src={roliTokenImage} alt="Roli Token" />
          </RewardItem>
          <RewardItem>
            <FaUserFriends size={18} color="#ff6600" /> 2nd Generation Referral: 2 Roli tokens 
            <TokenImage src={roliTokenImage} alt="Roli Token" />
          </RewardItem>
          <RewardItem>
            <FaUserFriends size={18} color="#ff6600" /> 3rd Generation Referral: 1 Roli token 
            <TokenImage src={roliTokenImage} alt="Roli Token" />
          </RewardItem>
        </ul>
      </ReferralInfo>

      {/* Bonus Milestones */}
      <BonusSection>
        <BonusTitle>Referral Bonuses</BonusTitle>
        <BonusList>
          <RewardItem>
            First 5 Referrals in a Month: 10 extra Roli tokens 
            <TokenImage src={roliTokenImage} alt="Roli Token" />
          </RewardItem>
          <RewardItem>
            10 Referrals in 2 Months: 30 extra Roli tokens 
            <TokenImage src={roliTokenImage} alt="Roli Token" />
          </RewardItem>
          <RewardItem>
            20 Referrals in 6 Months: 100 extra Roli tokens 
            <TokenImage src={roliTokenImage} alt="Roli Token" />
          </RewardItem>
        </BonusList>
      </BonusSection>

      {/* Referral Rank System */}
      <RankSection>
        <BonusTitle>Your Referral Rank</BonusTitle>
        {referralTiers.map((tier) => (
          <RankItem key={tier.tier}>
            <RankText>
              {tier.icon}
              {tier.tier} ({tier.referrals})
            </RankText>
            <span>{tier.reward}</span>
          </RankItem>
        ))}
      </RankSection>

      {/* Referral Lottery */}
      <BonusSection>
        <BonusTitle>Referral Lottery</BonusTitle>
        <ReferralText>
          For every successful referral, get an entry into the monthly lottery!
        </ReferralText>
        <ul>
          <RewardItem>
            Grand Prize: 5,000 Roli tokens 
            <TokenImage src={roliTokenImage} alt="Roli Token" />
          </RewardItem>
          <RewardItem>
            2nd Place: 1,000 Roli tokens 
            <TokenImage src={roliTokenImage} alt="Roli Token" />
          </RewardItem>
          <RewardItem>
            3rd Place: 500 Roli tokens 
            <TokenImage src={roliTokenImage} alt="Roli Token" />
          </RewardItem>
        </ul>
      </BonusSection>
    </Container>
  );
};

export default Referral;
