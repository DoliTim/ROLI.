import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaUserPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // For sending requests to the backend
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

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    referralCode: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const authSound = new Audio(authSoundFile);
  const denySound = new Audio(denySoundFile);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/register', formData);
      if (response.status === 200) {
        authSound.play();
        setError('');
        navigate('/subscription');
      }
    } catch (error) {
      denySound.play();
      setError(error.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <Container>
      <Title>
        <FaUserPlus />
        Create an Account
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
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default RegisterPage;
