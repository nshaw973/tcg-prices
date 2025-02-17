import { gql } from '@apollo/client';

// Query for current user
export const QUERY_ME = gql`
  query me {
    me {
      _id
      userId
      username
      cardCollection {
        cardId
        name
        set {
          id
          name
          series
        }
        images {
          small
          large
        }
        tcgPlayer
      }
    }
  }
`;

// Query for user by userId
export const QUERY_USER = gql`
  query user($userId: String!) {
    user(userId: $userId) {
      username
      userId
      cardCollection {
        cardId
        name
        set {
          id
          name
          series
        }
        images {
          small
          large
        }
        tcgPlayer
      }
    }
  }
`;