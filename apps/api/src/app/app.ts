import express, { Express } from 'express';
import { graphqlHTTP } from "express-graphql";

import { schema } from "./graphql";
import { ApiRouter, HealthCheckRouter } from "./routes";

export const app = express();

function initialiseApp(app: Express) {
  const routers: ApiRouter[] = [
    new HealthCheckRouter()
  ];

  app.use(express.json());
  app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
  }));

  // Register routes
  routers.forEach((router: ApiRouter) => router.initialise(app));
}

// Initialise app
initialiseApp(app);
