import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #f8f8f8;
`;

const StyledNavLink = styled(Link)`
  margin: 0 1rem;
  text-decoration: none;
  color: black;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledSearchInput = styled.input`
  padding: 0.5rem;
  margin: 0 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  useEffect(() => {
    // This effect will run every time the `isLoggedIn` state changes,
    // ensuring the component re-renders when the user logs in or out.
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, [isLoggedIn]);

  return (
    <StyledNav>
      <StyledNavLink to="/">Home</StyledNavLink>
      <StyledSearchInput type="text" placeholder="Search books..." />
      <div>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            style={{
              background: 'none',
              border: 'none',
              color: 'black',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Logout
          </button>
        ) : (
          <>
            <StyledNavLink to="/login">Login</StyledNavLink>
            <StyledNavLink to="/signup">Signup</StyledNavLink>
          </>
        )}
      </div>
    </StyledNav>
  );
};

export default Navbar;
