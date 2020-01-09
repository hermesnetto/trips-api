import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

require('dotenv').config();

const apolloServer = new ApolloServer({ typeDefs, resolvers });
const app = express();

apolloServer.applyMiddleware({ app });

app.listen({ port: process.env.PORT || 4000 }, () =>
  console.log(`🚀 GraphQL Server ready at http://localhost:4000${apolloServer.graphqlPath}`)
);
