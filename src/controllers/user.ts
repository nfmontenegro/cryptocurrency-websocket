import {Request, Response, NextFunction} from 'express';

import User from '../database/models';
import logger from '../util/logger';

async function createUser(request: Request, response: Response, next: NextFunction): Promise<void> {
  try {
    logger.info('params to craete user: ', request.body);
    const users = await User.findAll();
    // logger.debug(users);
    response.send(users);
  } catch (err) {
    next(err);
  }
}

export {createUser};
