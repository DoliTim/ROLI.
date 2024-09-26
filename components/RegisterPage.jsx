// src/components/RegisterPage.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaUserPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  font-family: 'Poppins', sans-serif;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f7f7f7;
  text-align: center; /* Center the text inside the container */
`;

const FormWrapper = styled(motion.div)`
  background-color: #ffffff;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
`;

const Title = styled.h2`
  text-align: center;
  color: #ff6600;
  margin-bottom: 30px;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center; /* Center the form elements */
`;

const Label = styled.label`
  margin-bottom: 15px;
  font-size: 16px;
  color: #333;
  font-weight: 500;
  width: 100%; /* Ensure labels take full width */

  span {
    display: block;
    margin-bottom: 5px;
    text-align: left; /* Align labels to the left */
  }

  input {
    padding: 14px 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    width: 100%;

    &:focus {
      outline: none;
      border-color: #ff6600;
      box-shadow: 0 0 0 2px rgba(255, 102, 0, 0.2);
    }
  }
`;

const SubmitButton = styled.button`
  background-color: #ff6600;
  color: #fff;
  padding: 16px;
  font-size: 18px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  margin-top: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;

  &:hover {
    background-color: #e65c00;
  }
`;

const RegisterPage = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', referralCode: '' });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Implement registration logic
    console.log('Register:', formData);
    navigate('/subscription');
  };

  return (
    <Container>
      <FormWrapper
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title>
          <FaUserPlus style={{ marginRight: '10px' }} />
          Create an Account
        </Title>
        <Form onSubmit={handleSubmit}>
          <Label>
            <span>Username</span>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          </Label>
          <Label>
            <span>Email</span>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </Label>
          <Label>
            <span>Password</span>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </Label>
          <Label>
            <span>Referral Code (Optional)</span>
            <input
              type="text"
              value={formData.referralCode}
              onChange={(e) => setFormData({ ...formData, referralCode: e.target.value })}
            />
          </Label>
          <SubmitButton type="submit">Register</SubmitButton>
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default RegisterPage;
