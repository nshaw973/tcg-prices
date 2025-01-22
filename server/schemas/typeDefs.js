const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    username: String
    email: String
    password: String
    recruiter: Boolean
    profileImage: String
    favorites: [ID]!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, username: String!, email: String!, password: String!, recruiter: Boolean!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;