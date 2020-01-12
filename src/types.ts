import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import { EntityManager } from 'typeorm';

export interface Ctx extends ExpressContext {
  user: { id: number; email: string; token: string } | null;
  manager: EntityManager;
  formatResponse: <T>(success: boolean, message: string, data?: T) => MutationResponse<T>;
}

export interface Args<T> {
  input: T;
}

export interface MutationResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

/**
 * GraphQl Models
 */

export interface GqlToken {
  token: string;
}
