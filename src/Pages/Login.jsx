import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../Constants'

const StyledContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledTitle = styled.h2`
  margin-bottom: 1rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledInput = styled.input`
  margin: 0.5rem 0;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
`;

const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: darkblue;
  }
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    // You can perform authentication here, such as sending a request to your backend
    try {
      // Authenticate using Axios
      const response = await axios.post(API_BASE_URL + `/auth/login`, { username, password });

      // Handle response
      console.log('Response:', response.data);
      // Assuming your backend returns a token upon successful login
      const { token } = response.data;
      if (token) {
        // Store token in local storage
        localStorage.setItem('token', token);
        console.log('Login successful! Token stored:', token);

        // Navigate to home page
        navigate('/'); // Redirect to home page
      } else {
        setError('Invalid username or password.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login. Please try again later.');
    }
  };

  return (
    <StyledContainer>
      <StyledTitle>Login</StyledTitle>
      <StyledForm onSubmit={handleLogin}>
        <StyledInput
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <StyledInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <StyledButton type="submit">Login</StyledButton>
      </StyledForm>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </StyledContainer>
  );
};

export default Login;
