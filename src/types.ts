import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import { EntityManager } from 'typeorm';

export interface Ctx extends ExpressContext {
  user: { id: number; email: string } | null;
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
export interface GqlUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  // events: [Event]
}

export interface GqlToken {
  token: string;
}
