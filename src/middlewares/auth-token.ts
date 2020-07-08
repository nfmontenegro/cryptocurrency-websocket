import {verify} from "jsonwebtoken";
import HttpStatus from "http-status-codes";
import {Response, NextFunction} from "express";

import {findOne} from "../lib";
import {SECRET} from "../config";
import {IRequest, ITokenData, IErrorMessage} from "../interfaces";
import {getErrorResponseMessage} from "../util";

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
      const user = await findOne("User", "id", userId);
      if (user) {
        req.user = user;
        console.log("@@@ user", user);
        next();
      } else {
        next(responseMessage(401, "Does not have access rights to the content"));
      }
    } else {
      next(responseMessage(403, "Does not have access rights to the content"));
    }
  } catch (e) {
    next(responseMessage(401, "Does not have access rights to the content"));
  }
}

export {verifyToken};
