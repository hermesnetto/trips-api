import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import { EntityManager } from 'typeorm';

export interface Ctx extends ExpressContext {
  manager: EntityManager;
}

export interface Args<T> {
  input: T;
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
