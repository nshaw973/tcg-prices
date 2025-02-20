import { gql } from "@apollo/client";

// Login mutation
export const LOGIN_USER = gql`
  mutation login($userId: String!, $password: String!) {
    login(userId: $userId, password: $password) {
      token
      user {
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

// Remove card from collection mutation
export const SELL_CARD = gql`
  mutation removeCardAndUpdateBalance($userId: String!, $cardId: ID!, $price: Float!) {
    removeCardAndUpdateBalance(userId: $userId, cardId: $cardId, price: $price) {
      userId
      username
      balance
      collectionWorth
    }
  }
`;
