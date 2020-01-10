import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

require('dotenv').config();

import 'reflect-metadata';
import { createConnection } from 'typeorm';
// import { User } from './entity/User';

createConnection()
  .then(() => {})
  .catch(error => console.log(error));

// createConnection()
//   .then(async connection => {
//     console.log('Inserting a new user into the database...');
//     const user = new User();
//     user.firstName = 'Timber';
//     user.lastName = 'Saw';
//     user.age = 25;
//     await connection.manager.save(user);
//     console.log('Saved a new user with id: ' + user.id);

//     console.log('Loading users from the database...');
//     const users = await connection.manager.find(User);
//     console.log('Loaded users: ', users);

//     console.log('Here you can setup and run express/koa/any other framework.');
//   })
//   .catch(error => console.log(error));

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  /** It enables the GraphQL Playgroind in production */
  introspection: true,
  playground: true
});
const app = express();
const port = process.env.PORT || 4000;

apolloServer.applyMiddleware({ app });

app.listen({ port }, () => console.log(`🚀 GraphQL Server ready at port: ${port}`));
