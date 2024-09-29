// src/components/SignInPage.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // For sending requests to the backend
import Clickable from './Clickable';
import authSoundFile from '../assets/authSound.mp3';
import denySoundFile from '../assets/denySound.mp3';

// Styled Components

const Container = styled.div`
  font-family: 'Poppins', sans-serif;
  padding: 60px 20px;
  background: linear-gradient(135deg, #1f1c2c, #928dab);
  min-height: 100vh;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 36px;
  margin-bottom: 20px;
  text-shadow: 0 0 10px rgba(255, 102, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;

  svg {
    margin-right: 10px;
  }
`;

const FormWrapper = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid #ff6600;
  border-radius: 12px;
  padding: 40px 30px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 0 15px rgba(255, 102, 0, 0.5);
  backdrop-filter: blur(10px);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 15px;
  font-size: 16px;
  color: #ff6600;
  font-weight: 500;
  width: 100%;

  span {
    display: block;
    margin-bottom: 5px;
    text-align: left;
  }

  input {
    padding: 14px 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    width: 100%;
    background-color: #1e1e1e;
    color: #fff;

    &:focus {
      outline: none;
      border-color: #ff6600;
      box-shadow: 0 0 0 2px rgba(255, 102, 0, 0.2);
    }
  }
`;

const SubmitButton = styled(motion.button)`
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

const ErrorMessage = styled.p`
  color: #ff4d4d;
  margin-top: 10px;
  text-align: center;
`;

const SignInPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const authSound = new Audio(authSoundFile);
  const denySound = new Audio(denySoundFile);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/signin', formData);
      if (response.status === 200) {
        authSound.play();
        setError('');
        // Navigate to the dashboard after successful login
        navigate('/Teams'); 
      }
    } catch (error) {
      denySound.play();
      setError(error.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <Container>
      <Title>
        <FaSignInAlt />
        Sign In to Your Account
      </Title>
      <FormWrapper
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
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
          <Clickable>
            <SubmitButton type="submit">Sign In</SubmitButton>
          </Clickable>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default SignInPage;
