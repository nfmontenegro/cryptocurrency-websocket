import {v4 as uuidv4} from "uuid";

import db from "../database/models";

async function findOne(model: string, key: string, fields: string): Promise<any> {
  return db[model].findOne({
    where: {
      [key]: fields
    }
  });
}

async function create(model: string, fields: any): Promise<any> {
  return db[model].create({...fields, uuid: uuidv4()});
}

async function getAll(model: string, limit: number, offset: number): Promise<any> {
  return db[model].findAll({limit, offset});
}

async function update(model: string, query: any, body: any): Promise<any> {
  return db[model].update(body, query);
}

export {findOne, create, getAll, update};
