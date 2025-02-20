const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Decimal128
  scalar Date

  type Card {
    _id: ID!
    cardId: String!
    name: String
    set: Set
    images: Images
    price: Decimal128
    tcgPlayer: String
  }

  type Set {
    id: String
    name: String
    series: String
  }

  type Images {
    small: String
    large: String
  }

  type User {
    _id: ID!
    userId: String!
    username: String!
    balance: Decimal128
    avatar: String
    lastDailyCollected: Date
    cardCollection: [Card]
    collectionWorth: Decimal128
    cardCount: Int
  }

  input CardCollectionInput {
    cardIds: [ID!]! # List of card IDs to add to the collection
  }

  type Query {
    users: [User]
    user(userId: String!): User
    card(cardId: String!): Card
    me: User
  }

  type Mutation {
    login(userId: String!, password: String!): Auth!
    createUser(userId: String!, username: String!, password: String!, balance: Decimal128, avatar: String, lastDailyCollected: Date, collectionWorth: Decimal128): User
    updateBalance(userId: String!, balance: Float!): User
    addCardToCollection(userId: String!, cardIds: [ID!]!): User # Add cards to a user's collection
    removeCardFromCollection(userId: String!, cardId: ID!): User # Remove a card from a user's collection
  }

  type Auth {
    token: String
    user: User
  }
`;

module.exports = typeDefs;
