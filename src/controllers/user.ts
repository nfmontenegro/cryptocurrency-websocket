import {Request, Response, NextFunction} from "express";
import {sign} from "jsonwebtoken";

import {SECRET} from "../config";
import {IUser} from "../interfaces";
import {logger, errorResponseMessage} from "../util";
import {findOne, create, getAll, update, hashPassword, comparePasswords} from "../lib";

async function createUser(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
  try {
    const user = request.body as IUser;

    if (!Object.keys(user).length) {
      const responseMessage = errorResponseMessage("", 204);
      return response.status(204).send(responseMessage);
    }

    logger.debug("params to create user: ", user);

    const userEmailExist = await findOne("User", "email", user.email);

    if (userEmailExist) {
      const responseMessage = errorResponseMessage(`email ${user.email} already exists!`, 409);
      return response.status(409).send(responseMessage);
    }

    const hashedPassword = await hashPassword(user.password);
    const users = await create("User", {...user, password: hashedPassword});
    return response.status(201).send(users);
  } catch (err) {
    return next(err.message);
  }
}

async function getUsers(_request: Request, response: Response, next: NextFunction): Promise<Response | void> {
  try {
    const users = await getAll("User");
    return response.status(200).send(users);
  } catch (err) {
    return next(err.message);
  }
}

async function updateUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const userId = +req.params.userId;
    if (!userId) {
      return res.status(400).json({message: "Param resource not found"});
    }

    const query = {
      where: {id: userId}
    };

    const user: IUser = await update("User", query, req.body);

    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({message: "User not found"});
    }
  } catch (err) {
    return next(err.message);
  }
}

async function login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    logger.debug("params to login user: ", req.body.email);

    const {password, email} = req.body;
    const user = await findOne("User", "email", email);

    if (!user) {
      const responseMessage = errorResponseMessage(`No such user found ${email}`, 400);
      return res.status(400).send(responseMessage);
    }

    const isValidPassword = await comparePasswords(password, user.password);

    if (!isValidPassword) {
      const responseMessage = errorResponseMessage(`Invalid password`, 400);
      return res.status(400).send(responseMessage);
    }

    const token = sign({userId: user.id}, SECRET, {expiresIn: "1h"});

    return res.status(200).json({token, user});
  } catch (err) {
    console.log(err);
    return next(err.message);
  }
}

export {createUser, getUsers, login, updateUser};
