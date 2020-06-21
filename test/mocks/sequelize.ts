import mockUserData from "./user";
import {IUser} from "../../src/interfaces/models";

const mockSequelizeModels = {
  User: {
    findOne: jest.fn((value: any): any => {
      const [data] = Object.values(value.where);
      const [field] = Object.keys(value.where);
      const userExist = mockUserData.find((userData: IUser): boolean => userData[field] === data);

      return userExist ? true : false;
    }),
    create: jest.fn().mockReturnValue(mockUserData)
  }
};

export default mockSequelizeModels;
