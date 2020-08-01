import HttpStatus from "http-status-codes";
import {Request, Response, NextFunction} from "express";
import {sign} from "jsonwebtoken";

import {SECRET} from "../config";
import {hashPassword, comparePasswords, logger, getErrorResponseMessage} from "../libs";
import {findOne, create, getAll, update} from "../dao/user";

async function createUser(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
  try {
    const user = request.body;

    if (!Object.keys(user).length) {
      throw getErrorResponseMessage(HttpStatus.NO_CONTENT, undefined, HttpStatus.getStatusText(HttpStatus.NO_CONTENT));
    }

    logger.debug("params to create user: ", user);

    const userEmailExist = await findOne("email", user.email);
    if (userEmailExist) {
      throw getErrorResponseMessage(
        HttpStatus.CONFLICT,
        `Email ${user.email} already exist!`,
        HttpStatus.getStatusText(HttpStatus.CONFLICT)
      );
    }

    const hashedPassword = await hashPassword(user.password);
    const users = await create({...user, password: hashedPassword});
    return response.status(201).send(users);
  } catch (err) {
    return next(err);
  }
}

async function getUsers(_request: Request, response: Response, next: NextFunction): Promise<Response | void> {
  try {
    const users = await getAll();
    return response.status(200).send({result: users});
  } catch (err) {
    return next(err);
  }
}

async function updateUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const userId = Number(req.params.userId);
    if (!userId) {
      throw getErrorResponseMessage(
        HttpStatus.BAD_REQUEST,
        `Param resource not found`,
        HttpStatus.getStatusText(HttpStatus.BAD_REQUEST)
      );
    }

    const query = {
      where: {id: userId},
      returning: true
    };

    const user = await update(query, req.body);

    if (user) {
      return res.status(200).send(user);
    }
    throw getErrorResponseMessage(
      HttpStatus.NOT_FOUND,
      `User ${req.body.name} not found`,
      HttpStatus.getStatusText(HttpStatus.NOT_FOUND)
    );
  } catch (err) {
    return next(err);
  }
}

async function login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    logger.debug("params to login user: ", req.body.email);

    const {password, email} = req.body;
    const user = await findOne("email", email);
    if (!user) {
      throw getErrorResponseMessage(
        HttpStatus.NOT_FOUND,
        `No such user found ${email}`,
        HttpStatus.getStatusText(HttpStatus.NOT_FOUND)
      );
    }

    const isValidPassword = await comparePasswords(password, user.password);
    if (!isValidPassword) {
      throw getErrorResponseMessage(
        HttpStatus.BAD_REQUEST,
        "Invalid password",
        HttpStatus.getStatusText(HttpStatus.BAD_REQUEST)
      );
    }

    const token = sign({userId: user.id}, SECRET, {expiresIn: "1h"});
    return res.status(200).send({token, user});
  } catch (err) {
    return next(err);
  }
}

export {createUser, getUsers, login, updateUser};
