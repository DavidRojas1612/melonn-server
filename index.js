const express = require('express');
const { ApolloServer, PubSub } = require('apollo-server-express');
const { resolvers } = require('./src/resolvers');
const { typeDefs }  = require('./src/schema');
const { createServer } = require('http');

const pubsub = new PubSub();

const app = express();
const server = new ApolloServer({
  cors: true,
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res, pubsub })
});
const PORT = 4000;

server.applyMiddleware({ app });

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: PORT }, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${PORT}${
      server.subscriptionsPath
    }`
  );
});
