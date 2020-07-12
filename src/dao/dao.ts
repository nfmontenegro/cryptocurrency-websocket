import {Request} from "express";

import db from "../database/models";
import {IUser} from "../interfaces/models";

async function findOne(collection: string, field: string, params: string): Promise<IUser> {
  return db[collection].findOne({
    where: {
      [field]: params
    }
  });
}

async function create(collection: string, params: IUser): Promise<IUser> {
  return db[collection].create(params);
}

async function getAll(collection: string, request: Request): Promise<IUser> {
  const {page, pageSize} = request.query;
  const offset = page * pageSize;
  const limit = pageSize;
  return db[collection].findAll({limit, offset});
}

async function update(collection: string, query: any, body: IUser): Promise<IUser> {
  return db[collection].update(body, query);
}

export {findOne, create, getAll, update};
