import express from "express";
import "reflect-metadata";
import { createServer } from "http";
import { execute, subscribe } from "graphql";
import { ApolloServer } from "apollo-server-express";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { buildSchema } from "type-graphql";
import mongoose from "mongoose";

(async () => {
  const app = express();
  const httpServer = createServer(app);

  const schema = await buildSchema({
    resolvers: [__dirname + "/**/*.resolver.ts"],
    authChecker: ({ context: { req } }) => !!req.isAuth,
  });

  const subscriptionServer = SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: "/graphql" }
  );

  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
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
        `Server is now running on http://localhost:${process.env.PORT}/graphql`
      );
    })
    .catch((err) => {
      console.log(err);
    });
})();
