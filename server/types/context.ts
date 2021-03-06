import { Request, Response } from "express";

interface Context {
  req: Request;
  res: Response;
  user?: string;
}

export default Context;
