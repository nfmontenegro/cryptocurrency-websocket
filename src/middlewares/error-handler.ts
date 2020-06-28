import {Response, Request, NextFunction} from "express";
import {errorResponseMessage} from "../util";

function errorHandler(error: string, _req: Request, res: Response, _next: NextFunction): object {
  const errorMessage = errorResponseMessage(error, 500);
  return res.status(500).send(errorMessage);
}

export default errorHandler;
