import {Response, NextFunction} from "express";

import db from "../database/models";
import {logger} from "../libs";
import {IRequest} from "../interfaces";

async function createPost(request: IRequest, response: Response, next: NextFunction): Promise<Response | void> {
  try {
    const post = await db.User.create({...request.body, userId: request.locals.user.uuid});
    return response.status(201).send({result: post});
  } catch (err) {
    logger.info(err);
    return next(err);
  }
}

export {createPost};
