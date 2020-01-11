import { UserMutations, UserQueries } from './user';
import { LocationMutations, LocationQueries } from './location';

export const resolvers = {
  Query: {
    ...UserQueries,
    ...LocationQueries,
  },
  Mutation: {
    ...UserMutations,
    ...LocationMutations,
  },
  MutationResponse: {
    __resolveType(): null {
      return null;
    },
  },
};
