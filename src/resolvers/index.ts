import { UserMutations } from './user/mutations';

export const resolvers = {
  Query: {
    hello: () => 'Hello world!'
  },
  Mutation: {
    ...UserMutations
  }
};
