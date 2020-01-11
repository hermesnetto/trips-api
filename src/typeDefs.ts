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

  type Token {
    token: String
  }

  type Query {
    me: User
  }

  type Mutation {
    # User
    createUser(input: CreateUserInput): CreateUserResponse
    login(input: LoginInput): LoginResponse
  }

  # Inputs
  input CreateUserInput {
    firstName: String!
    lastName: String
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  # Responses
  interface MutationResponse {
    success: Boolean!
    message: String!
  }

  type CreateUserResponse implements MutationResponse {
    success: Boolean!
    message: String!
    data: User
  }

  type LoginResponse implements MutationResponse {
    success: Boolean!
    message: String!
    data: Token
  }
`;
