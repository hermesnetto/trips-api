import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';

import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

require('dotenv').config();

createConnection()
  .then(async connection => {
    const { manager } = connection;
    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
      /** It enables the GraphQL Playgroind in production */
      introspection: true,
      playground: true,
      context(ctx: ExpressContext) {
        return {
          ...ctx,
          manager
        };
      }
    });

    const app = express();
    const port = process.env.PORT || 4000;

    apolloServer.applyMiddleware({ app });

    app.listen({ port }, () => console.log(`🚀 GraphQL Server ready at port: ${port}`));
  })
  .catch(error => console.log(error));
