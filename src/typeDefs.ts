import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Event {
    id: Int
    title: String
    description: String
    maxPeopleCount: Int
    leaveDate: String
    returnDate: String
    meetingPlace: Location
    destiny: Location
    user: User
    members: [User]
    createdAt: String
    updatedAt: String
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

    # Event
    events: [Event]
  }

  type Mutation {
    # User
    signUp(input: SignUpInput): SignUpResponse
    login(input: LoginInput): LoginResponse

    # Location
    createLocation(input: CreateLocationInput): CreateLocationResponse

    # Event
    createEvent(input: CreateEventInput): CreateEventResponse
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

  input CreateEventInput {
    title: String!
    description: String
    maxPeopleCount: Int!
    leaveDate: String!
    returnDate: String!
    meetingPlaceID: Int!
    destinyID: Int!
    membersIDs: [Int]
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

  type CreateEventResponse implements MutationResponse {
    success: Boolean!
    message: String!
    data: Event
  }
`;
