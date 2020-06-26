import db from "../database/models";
import {IUser} from "../interfaces/models";
import {Model} from "sequelize";

async function findOne(collection: string, field: string, params: string): Promise<Model> {
  return db[collection].findOne({
    where: {
      [field]: params
    }
  });
}

async function create(collection: string, params: IUser): Promise<Model> {
  return db[collection].create(params);
}

async function getAll(collection: string): Promise<Model> {
  const users = db[collection].findAll();
  return users;
}

export {findOne, create, getAll};
