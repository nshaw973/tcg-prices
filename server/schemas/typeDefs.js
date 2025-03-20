const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Decimal128
  scalar Date

  type Card {
    _id: ID!
    cardId: String!
    name: String
    set: Set!
    images: Images!
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
    cardCollection: [Card]!
    collectionWorth: Decimal128
    favorites: [Card]
    cardCount: Int
  }

  input SetInput {
    id: String
    name: String
    series: String
  }

  input ImagesInput {
    small: String
    large: String
  }

  input CardCollectionInput {
    cardIds: [ID!]!
  }

  type Query {
    users: [User]
    user(userId: String!): User
    card(cardId: String!): Card
    me: User
    randomUser: User
  }

  type Mutation {
    login(userId: String!, password: String!): Auth!
    createUser(
      userId: String!
      username: String!
      password: String!
      balance: Decimal128
      avatar: String
      lastDailyCollected: Date
      collectionWorth: Decimal128
    ): User
    favorite(_id: ID!): Card
    unFavorite(_id: ID!): Card
    updateBalance(userId: String!, balance: Decimal128!): User
    removeCardAndUpdateBalance(
      userId: String!
      cardId: ID!
      price: Decimal128!
    ): User
  }

  type Auth {
    token: String
    user: User
  }
`;

module.exports = typeDefs;
