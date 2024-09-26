// src/components/SignInPage.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  font-family: 'Poppins', sans-serif;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f7f7f7;
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
`;

const Label = styled.label`
  margin-bottom: 15px;
  font-size: 16px;
  color: #333;
  font-weight: 500;

  span {
    display: block;
    margin-bottom: 5px;
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

const SignInPage = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Implement sign-in logic
    console.log('Sign In:', formData);
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
          <FaSignInAlt style={{ marginRight: '10px' }} />
          Sign In to Your Account
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
            <span>Password</span>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </Label>
          <SubmitButton type="submit">Sign In</SubmitButton>
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default SignInPage;
