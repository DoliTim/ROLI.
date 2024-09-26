// src/components/SubscriptionPage.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  padding: 60px 20px;
  font-family: 'Roboto', sans-serif;
`;

const Title = styled.h2`
  text-align: center;
  color: #ff6600;
  margin-bottom: 40px;
`;

const PackagesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const PackageCard = styled(motion.div)`
  background-color: #fff;
  border: 2px solid #ff6600;
  border-radius: 8px;
  width: 300px;
  margin: 20px;
  padding: 30px;
  text-align: center;
  position: relative;
  overflow: hidden;

  &:hover {
    box-shadow: 0 4px 20px rgba(255, 102, 0, 0.2);
  }
`;

const PackageName = styled.h3`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Price = styled.p`
  font-size: 32px;
  color: #ff6600;
  margin-bottom: 20px;
`;

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 20px;

  li {
    font-size: 16px;
    margin-bottom: 10px;
  }
`;

const SelectButton = styled.button`
  background-color: #ff6600;
  color: #fff;
  padding: 12px 24px;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #e65c00;
  }
`;

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState(null);

  const packages = [
    { id: 1, name: 'Package 1', price: 150, benefits: ['Benefit 1', 'Benefit 2'] },
    { id: 2, name: 'Package 2', price: 500, benefits: ['Benefit 1', 'Benefit 2', 'Benefit 3'] },
    { id: 3, name: 'Package 3', price: 1000, benefits: ['Benefit 1', 'Benefit 2', 'Benefit 3', 'Benefit 4'] },
    // Add more packages as needed
  ];

  const handleSelect = (pkg) => {
    setSelectedPackage(pkg.id);
    // TODO: Implement subscription logic
    console.log('Selected package:', pkg);
    navigate('/engagement');
  };

  return (
    <Container>
      <Title>Select a Subscription Package</Title>
      <PackagesContainer>
        {packages.map((pkg, index) => (
          <PackageCard
            key={pkg.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <PackageName>{pkg.name}</PackageName>
            <Price>€{pkg.price}</Price>
            <BenefitsList>
              {pkg.benefits.map((benefit, idx) => (
                <li key={idx}>{benefit}</li>
              ))}
            </BenefitsList>
            <SelectButton onClick={() => handleSelect(pkg)}>Select</SelectButton>
          </PackageCard>
        ))}
      </PackagesContainer>
    </Container>
  );
};

export default SubscriptionPage;
