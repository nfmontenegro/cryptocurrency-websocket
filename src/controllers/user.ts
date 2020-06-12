import {Request, Response, NextFunction} from 'express';

import db from '../database/models';
import logger from '../util/logger';

async function createUser(request: Request, response: Response, next: NextFunction): Promise<void> {
  try {
    logger.debug('params to create user: ', request.body);
    const users = await db.User.findAll();
    logger.info(users);
    response.status(200).send(users);
  } catch (err) {
    next(err);
  }
}

export {createUser};
