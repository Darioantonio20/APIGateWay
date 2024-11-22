import { Request, Response } from "express";

export const gatewayHealthCheck = (req: Request, res: Response) => {
  res.status(200).send("API Gateway is healthy!");
};
