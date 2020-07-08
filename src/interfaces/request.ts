import {Request} from "express";
import {IUser} from "./models";

interface IRequest extends Request {
  user: IUser;
}

export {IRequest};
