import db from "../database/models";
import {IUser} from "../interfaces/models";

async function findOne(field: string, params: string): Promise<IUser> {
  return db.User.findOne({
    where: {
      [field]: params
    }
  });
}

async function create(params: IUser): Promise<IUser> {
  return db.User.create(params);
}

async function getAll(): Promise<any> {
  return db.User.findAll();
}

async function update(query: any, body: IUser): Promise<IUser> {
  return db.User.update(body, query);
}

export {findOne, create, getAll, update};
