import express, { Express } from 'express';

import { ApiRouter } from "./routes";

export const app = express();

function initialiseApp(app: Express) {
  const routers: ApiRouter[] = [];

  app.use(express.json());

  // Register routes
  routers.forEach((router: ApiRouter) => router.initialise(app));
}

// Initialise app
initialiseApp(app);
