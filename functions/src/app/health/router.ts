import { IHealthStatusReceive, IResponse } from "common/types";
import { Request, Response, Router } from "express";

export default function HealthRouter(): Router {
  const router = Router();

  router.get("/liveness", (_req: Request, res: Response) => {
    return res.status(204);
  });

  router.get("/now", (_req: Request, res: Response) => {
    return res.json(
      new IResponse<IHealthStatusReceive>({ now: new Date() })
    );
  });

  return router;
}
