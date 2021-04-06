const { ApolloServer, PubSub } = require('apollo-server');
const { resolvers } = require('./resolvers');
const { typeDefs }  = require('./schema');
const configEnv = require('./config/config');

const pubsub = new PubSub();

const server = new ApolloServer({
  cors: true,
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res, pubsub })
});
const PORT = 4000;


server.listen({ port: configEnv.port || PORT }, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
});
