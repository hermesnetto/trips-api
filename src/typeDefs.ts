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
    signUp(input: SignUpInput): SignUpResponse
    login(input: LoginInput): LoginResponse
  }

  # Inputs
  input SignUpInput {
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

  type SignUpResponse implements MutationResponse {
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
