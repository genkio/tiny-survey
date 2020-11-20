import { Request, Response, Router } from "express";
import { HealthStatusReceive, IResponse } from "common/types";

export default function HealthRouter(): Router {
  const router = Router();

  router.get("/liveness", (_req: Request, res: Response) => {
    return res.status(204);
  });

  router.get("/now", (_req: Request, res: Response) => {
    return res.json(
      new IResponse<HealthStatusReceive>({ now: new Date() }),
    );
  });

  return router;
}
