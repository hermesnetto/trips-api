"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var apollo_server_express_1 = require("apollo-server-express");
var typeDefs_1 = require("./typeDefs");
var resolvers_1 = require("./resolvers");
require('dotenv').config();
var apolloServer = new apollo_server_express_1.ApolloServer({ typeDefs: typeDefs_1.typeDefs, resolvers: resolvers_1.resolvers });
var app = express_1.default();
var port = process.env.PORT || 4000;
apolloServer.applyMiddleware({ app: app });
app.listen({ port: port }, function () { return console.log("\uD83D\uDE80 GraphQL Server ready at port: " + port); });
