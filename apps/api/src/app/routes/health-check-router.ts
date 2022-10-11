import { Request, Response, Router } from 'express';

import db from '../db';
import { ApiRouter } from "./router";

export class HealthCheckRouter extends ApiRouter {
  BASE_URL = '/api/health';

  register(router: Router): void {
    router.get(
      '/db',
      async (req: Request, res: Response) => {
        try {
          await db.raw("SELECT 1");
          res.status(200).send();
        } catch (e) {
          console.error(e);
          res.status(500).send();
        }
      })
  }
}
