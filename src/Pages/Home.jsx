import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Components/nav-bar/nav-bar';
import BookCard from '../Components/book-card/book-card';
import styled from 'styled-components';
import axios from 'axios';
import { API_BASE_URL } from '../Constants'

const StyledContainer = styled.div`
  padding: 1rem;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const StyledTitle = styled.h1`
  text-align: center;
`;

const StyledAddLink = styled(Link)`
  padding: 0.5rem 1rem;
  background-color: blue;
  color: white;
  text-decoration: none;
  border-radius: 4px;

  &:hover {
    background-color: darkblue;
  }
`;

const StyledBookList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`;

const Home = () => {
  const [books, setBooks] = useState([]); // Store the list of books
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage

      if (!token) {
        console.error('No token found');
        return;
      }

      await axios.delete(API_BASE_URL + `/book/books/${id}`, {
        headers: {
          Authorization: `${token}`, // Include token in headers
        },
      });

      setBooks(books.filter((book) => book.id !== id)); // Remove deleted book from state
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from local storage

      if (!token) {
        console.error('No token found');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(API_BASE_URL + `/book/books`, {
          headers: {
            Authorization: `${token}`, // Include token in headers
          },
        });
        setBooks(response.data); // Set the books in state
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching books:', error);
        setLoading(false); // Ensure loading is false on error
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <div>Loading books...</div>; // Display a loading text or a spinner

  return (
    <StyledContainer>
      <Navbar />
      <StyledHeader>
        <StyledTitle>Book Finder</StyledTitle>
        <StyledAddLink to="/add">Add Book</StyledAddLink>
      </StyledHeader>
      <StyledBookList>
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </StyledBookList>
    </StyledContainer>
  );
};

export default Home;
