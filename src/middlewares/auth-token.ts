import {verify} from "jsonwebtoken";
import HttpStatus from "http-status-codes";
import {Response, NextFunction} from "express";

import {SECRET} from "../config";
import {getErrorResponseMessage} from "../libs";
import {findOne} from "../dao/user";
import {IRequest, ITokenData, IErrorMessage} from "../interfaces";

function responseMessage(code: number, message: string): IErrorMessage {
  return getErrorResponseMessage(code, message, HttpStatus.getStatusText(code));
}

async function verifyToken(req: IRequest, _res: Response, next: NextFunction): Promise<void> {
  try {
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      const {userId} = verify(bearerToken, SECRET) as ITokenData;
      if (userId) {
        const user = await findOne("id", userId);
        if (user) {
          req.user = user;
          next();
        } else {
          next(responseMessage(401, "Does not have access rights to the content"));
        }
      } else {
        next(responseMessage(401, "Token error"));
      }
    } else {
      next(responseMessage(403, "Does not have access rights to the content"));
    }
  } catch (e) {
    next(responseMessage(401, "Does not have access rights to the content"));
  }
}

export {verifyToken};
