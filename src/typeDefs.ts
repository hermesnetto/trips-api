import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Event {
    id: Int
  }

  type User {
    id: Int!
    firstName: String!
    lastName: String
    email: String!
    createdAt: String!
    updatedAt: String!
    events: [Event]
  }

  type Query {
    hello: String
  }

  type Mutation {
    createUser(input: CreateUserInput): User
  }

  input CreateUserInput {
    firstName: String!
    lastName: String
    email: String!
    password: String!
  }
`;
