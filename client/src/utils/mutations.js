import { gql } from '@apollo/client';

// Login mutation
export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        userId
        username
      }
    }
  }
`;

// Update balance mutation
export const UPDATE_BALANCE = gql`
  mutation updateBalance($userId: String!, $balance: Float!) {
    updateBalance(userId: $userId, balance: $balance) {
      _id
      userId
      balance
    }
  }
`;

// Update username mutation
export const UPDATE_USERNAME = gql`
  mutation updateUsername($userId: String!, $newUsername: String!) {
    updateUsername(userId: $userId, newUsername: $newUsername) {
      _id
      userId
      username
    }
  }
`;

// Add card to collection mutation
export const ADD_CARD_TO_COLLECTION = gql`
  mutation addCardToCollection($userId: String!, $cardId: String!) {
    addCardToCollection(userId: $userId, cardId: $cardId) {
      userId
      cardIds
    }
  }
`;

// Remove card from collection mutation
export const REMOVE_CARD_FROM_COLLECTION = gql`
  mutation removeCardFromCollection($userId: String!, $cardId: String!) {
    removeCardFromCollection(userId: $userId, cardId: $cardId) {
      userId
      cardIds
    }
  }
`;
