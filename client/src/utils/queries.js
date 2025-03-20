import { gql } from "@apollo/client";

// Query for current user
export const QUERY_ME = gql`
  query me {
    me {
      _id
      userId
      username
      avatar
      balance
      lastDailyCollected
      collectionWorth
    }
  }
`;

// Query for user by userId
export const QUERY_USER = gql`
  query user($userId: String!) {
    user(userId: $userId) {
      username
      userId
      avatar
      balance
      lastDailyCollected
      cardCount
      collectionWorth
      favorites {
        _id
        cardId
        name
        price
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
      cardCollection {
        _id
        cardId
        name
        price
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

export const QUERY_USERS = gql`
  query Users {
    users {
      userId
      username
      avatar
      balance
      lastDailyCollected
      collectionWorth
      cardCount
    }
  }
`;

export const QUERY_RANDOM = gql`
  query randomUser {
    randomUser {
      _id
      userId
      username
      avatar
      balance
      cardCount
      collectionWorth
      cardCollection {
        _id
        cardId
        name
        price
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
