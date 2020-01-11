import 'reflect-metadata';
import express from 'express';
import jwt from 'jsonwebtoken';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';

import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import { formatResponse } from './utils';

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
        const { req } = ctx;
        const token = req.headers.authorization || '';
        let user = null;

        try {
          const result = jwt.verify(token.split(' ')[1], '@TripsPassword!!');
          user = result as { id: number; email: string };
        } catch (e) {}

        return {
          ...ctx,
          user,
          manager,
          formatResponse,
        };
      },
    });

    const app = express();
    const port = process.env.PORT || 4000;

    apolloServer.applyMiddleware({ app });

    app.listen({ port }, () => console.log(`🚀 GraphQL Server ready at port: ${port}`));
  })
  .catch(error => console.log(error));
