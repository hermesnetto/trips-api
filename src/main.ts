import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

require('dotenv').config();

const apolloServer = new ApolloServer({ typeDefs, resolvers });
const app = express();
const port = process.env.PORT || 4000;

apolloServer.applyMiddleware({ app });

app.listen({ port }, () => console.log(`🚀 GraphQL Server ready at port: ${port}`));
