import db from "../database/models";
import {IUser} from "../interfaces/models";

async function findOne(collection: string, field: string, params: string): Promise<any> {
  return db[collection].findOne({
    where: {
      [field]: params
    }
  });
}

async function create(collection: string, params: IUser): Promise<any> {
  return db[collection].create(params);
}

async function getAll(collection: string): Promise<any> {
  const users = db[collection].findAll();
  return users;
}

export {findOne, create, getAll};
