import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import BookCard from '../Components/book-card/book-card';
import { API_BASE_URL } from '../Constants'

const StyledContainer = styled.div`
  padding: 1rem;
`;

const StyledTitle = styled.h2`
  text-align: center;
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

const StyledSaveButton = styled.button`
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  background-color: green;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: darkgreen;
  }
`;

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: '',
    author: '',
    isbn: '',
    publishedDate: '',
    imageUrl: '',
  });
  const [isDetailMode, setIsDetailMode] = useState(false);

  useEffect(() => {
    if (id) {
      // Fetch book details if we are in edit or detail mode
      const fetchBook = async () => {
        try {
          const token = localStorage.getItem('token'); // Retrieve token from local storage
          const response = await axios.get(API_BASE_URL + `/book/books/${id}`, {
            headers: {
              Authorization: `${token}`, // Include token in headers
            },
          });
          setBook(response.data);
          setIsDetailMode(window.location.pathname.includes('details'));
        } catch (error) {
          console.error('Error fetching book:', error);
        }
      };

      fetchBook();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      if (id) {
        // Update existing book
        await axios.put(API_BASE_URL + `/book/books/${id}`, book, {
          headers: {
            Authorization: `${token}`, // Include token in headers
          },
        });
      } else {
        // Add new book
        await axios.post(API_BASE_URL + `/book/books`, book, {
          headers: {
            Authorization: `${token}`, // Include token in headers
          },
        });
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving book:', error);
    }
  };

  return (
    <StyledContainer>
      <StyledTitle>{isDetailMode ? 'Book Details' : id ? 'Edit Book' : 'Add Book'}</StyledTitle>
      {isDetailMode ? (
        <BookCard key={book.id}
          book={book}>
        </BookCard>
      ) : (
        <StyledForm onSubmit={handleSubmit}>
          <StyledInput
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            placeholder="Title"
          />
          <StyledInput
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            placeholder="Author"
          />
          <StyledInput
            type="text"
            name="imageUrl"
            value={book.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
          />
          <StyledSaveButton type="submit">Save</StyledSaveButton>
        </StyledForm>
      )}
    </StyledContainer>
  );
};

export default EditBook;
