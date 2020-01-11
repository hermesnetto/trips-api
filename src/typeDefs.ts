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

  type Location {
    id: Int
    zipcode: String
    street: String
    number: Int
    city: String
    state: String
    country: String
    district: String
    createdAt: String
    updatedAt: String
  }

  type Token {
    token: String
  }

  type Query {
    me: User

    # Location
    location(id: Int!): Location
  }

  type Mutation {
    # User
    signUp(input: SignUpInput): SignUpResponse
    login(input: LoginInput): LoginResponse

    # Location
    createLocation(input: CreateLocationInput): CreateLocationResponse
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

  input CreateLocationInput {
    zipcode: String
    street: String
    number: Int
    city: String
    state: String
    country: String
    district: String
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

  type CreateLocationResponse implements MutationResponse {
    success: Boolean!
    message: String!
    data: Location
  }
`;
