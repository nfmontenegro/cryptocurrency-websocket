import {Request, Response} from "express";

import db from "../database/models";
import logger from "../util/logger";
import errorResponseMessage from "../util/response-parser";
import {IUser} from "../interfaces/models";

async function createUser(request: Request, response: Response): Promise<any> {
  try {
    const user = request.body as IUser;

    if (!Object.keys(user).length) {
      const responseMessage = errorResponseMessage("", 204);
      return response.status(204).send(responseMessage);
    }

    logger.debug("params to create user: ", user);
    const userEmailExist = await db.User.findOne({
      where: {
        email: user.email
      }
    });

    if (userEmailExist) {
      const responseMessage = errorResponseMessage(`email ${user.email} already exists!`, 409);
      return response.status(409).send(responseMessage);
    }

    const users = await db.User.create(user);
    return response.status(201).send(users);
  } catch (err) {
    const errorMessage = errorResponseMessage(err.message, 500);
    return response.status(500).send(errorMessage);
  }
}

export {createUser};
