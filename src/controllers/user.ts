import {Request, Response, NextFunction} from 'express';
import {logger} from '../app';

async function createUser(request: Request, response: Response, next: NextFunction): Promise<void> {
  try {
    logger.info(request.body);
    response.send('hello');
  } catch (err) {
    next(err);
  }
}

export {createUser};
