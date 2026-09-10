import { Request, Response } from "express";

export const getHealthStatus = (req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
};
