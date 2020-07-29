import {Request} from "express";
import {Op} from "sequelize";

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

const getPagination = (page: number, size: number): object => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return {limit, offset};
};

const getPagingData = (data: object, page: number, limit: number): object => {
  const {count: totalItems, rows: tutorials} = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return {totalItems, tutorials, totalPages, currentPage};
};

async function getAll(collection: string, request: Request): Promise<any> {
  const {page, size, title} = request.query;
  const condition = title ? {title: {[Op.like]: `%${title}%`}} : null;

  const {limit, offset} = getPagination(page, size);

  const data = db[collection].findAndCountAll({where: condition, limit, offset});
  return getPagingData(data, page, limit);
}

async function update(collection: string, query: any, body: IUser): Promise<IUser> {
  return db[collection].update(body, query);
}

export {findOne, create, getAll, update};
