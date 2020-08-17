import {Request} from "express";
import {IUser} from "./models";

interface IRequest extends Request {
  locals: {user: IUser};
}

export {IRequest};
