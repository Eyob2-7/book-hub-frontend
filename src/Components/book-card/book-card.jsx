import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledCard = styled.div`
  border: 1px solid #ccc;
  padding: 1rem;
  width: 200px;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledBookImage = styled.img`
  width: 100px;
  height: 150px;
  object-fit: cover;
  margin-bottom: 1rem;
`;

const StyledBookTitle = styled.h3`
  margin: 0.5rem 0;
`;

const StyledBookAuthor = styled.p`
  margin: 0.5rem 0;
`;

const StyledEditLink = styled(Link)`
  margin: 0.5rem 0;
  text-decoration: none;
  color: blue;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledDeleteButton = styled.button`
  padding: 0.5rem;
  margin-top: 0.5rem;
  background-color: red;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: darkred;
  }
`;

const BookCard = ({ book, onDelete }) => {
  return (
    <StyledCard>
      <StyledBookImage src={book.imageUrl} alt={book.title} />
      <StyledBookTitle>{book.title}</StyledBookTitle>
      <StyledBookAuthor>{book.author}</StyledBookAuthor>
      <StyledEditLink to={`/details/${book.id}`}>Details</StyledEditLink>
      <StyledEditLink to={`/edit/${book.id}`}>Edit</StyledEditLink>
      <StyledDeleteButton onClick={() => onDelete(book.id)}>
        Delete
      </StyledDeleteButton>
    </StyledCard>
  );
};

export default BookCard;
