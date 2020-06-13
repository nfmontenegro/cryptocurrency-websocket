import {Op} from 'sequelize';
import {Request, Response} from 'express';

import db from '../database/models';
import logger from '../util/logger';
import errorResponseMessage from '../util/response-parser';
import {IUser} from '../interfaces/models';

async function createUser(request: Request, response: Response): Promise<void> {
  try {
    logger.debug('params to create user: ', request.body);
    const user = request.body as IUser;

    const userEmailExist = await db.User.findAll({
      where: {
        email: {
          [Op.eq]: user.email
        }
      }
    });

    if (userEmailExist.length) {
      response.status(200).send('Email exist');
    }

    const users = await db.User.create(user);
    response.status(200).send(users);
  } catch (err) {
    const errorMessage = errorResponseMessage(err.message, 500);
    response.status(500).send(errorMessage);
  }
}

export {createUser};
