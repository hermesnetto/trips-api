import { UserMutations, UserQueries } from './user';
import { LocationMutations, LocationQueries } from './location';
import { EventMutations, EventQueries } from './event';

export const resolvers = {
  Query: {
    ...UserQueries,
    ...LocationQueries,
    ...EventQueries,
  },
  Mutation: {
    ...UserMutations,
    ...LocationMutations,
    ...EventMutations,
  },
  MutationResponse: {
    __resolveType(): null {
      return null;
    },
  },
};
