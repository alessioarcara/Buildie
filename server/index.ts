import express from "express";
import "reflect-metadata";
import { createServer } from "http";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { buildSchema } from "type-graphql";
import mongoose from "mongoose";

(async () => {
  // Create an Express app and HTTP server; we will attach the WebSocket
  // server and the ApolloServer to this HTTP server.
  const app = express();
  const httpServer = createServer(app);

  // Create schema, which will be used separately by ApolloServer and
  // the WebSocket server.
  const schema = await buildSchema({
    resolvers: [__dirname + "/**/*.resolver.ts"],
  });

  // Set up WebSocket server.
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });
  // Save the returned server's info so we can shutdown this server later
  const serverCleanup = useServer({ schema }, wsServer);

  // Set up ApolloServer.
  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();
  server.applyMiddleware({ app });

  mongoose
    .connect(process.env.DATABASE_URL!)
    .then(() => {
      httpServer.listen(process.env.PORT);
      console.log(
        `🚀 Query endpoint ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
      );
      console.log(
        `🚀 Subscription endpoint ready at ws://localhost:${process.env.PORT}${server.graphqlPath}`
      );
    })
    .catch((err) => {
      console.log(err);
    });
})();
