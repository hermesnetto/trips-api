import { UserMutations, UserQueries } from './user';

export const resolvers = {
  Query: {
    ...UserQueries,
  },
  Mutation: {
    ...UserMutations,
  },
  MutationResponse: {
    __resolveType(): null {
      return null;
    },
  },
};
