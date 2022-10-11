import express, { Application, Router } from 'express';

export abstract class ApiRouter {
  router: Router;

  abstract BASE_URL: string;

  constructor() {
    this.router = express.Router();
  }

  abstract register(router: Router): void;

  initialise(app: Application): void {
    this.register(this.router);
    app.use(this.BASE_URL, this.router);
  }
}
