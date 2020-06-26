// import mockUserData from "../mocks/user";
import mockSequelizeModels from "../mocks/sequelize";
import db from "../../src/database/models";
// import logger from "../../src/util/logger";
import {login} from "../../src/controllers";
import {req, res, next} from "../interceptor-request";

jest.mock("../../src/util/logger", (): object => ({
  debug: jest.fn(),
  info: jest.fn()
}));

jest.mock("../../src/lib/bcrypt", (): object => ({
  comparePasswords: jest.fn().mockReturnValue(false)
}));

jest.mock("../../src/database/models", (): object => mockSequelizeModels);

describe("login user test", (): void => {
  afterEach((): void => {
    jest.clearAllMocks();
  });

  test("should return 400 user not found", async (): Promise<void> => {
    req.body = {
      email: "fake2@gmail.com",
      password: "12345678"
    };

    await login(req, res, next);

    const spyFindOneUserModel = jest.spyOn(db.User, "findOne");
    expect(spyFindOneUserModel).toHaveBeenCalled();

    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(1);

    const responseMessage = {
      result: [{error: {code: 400, message: "Error:  No such user found fake2@gmail.com"}, status: "failure"}]
    };

    expect(res.send).toBeCalledWith(responseMessage);
    expect(res.status).toHaveBeenCalledWith(400);
    spyFindOneUserModel.mockClear();
  });

  test("should return 400 invalid password", async (): Promise<void> => {
    req.body = {
      email: "fake@gmail.com",
      password: "12345678"
    };

    await login(req, res, next);

    const spyFindOneUserModel = jest.spyOn(db.User, "findOne");
    expect(spyFindOneUserModel).toHaveBeenCalled();

    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(1);

    const responseMessage = {
      result: [{error: {code: 400, message: "Error:  Invalid password"}, status: "failure"}]
    };

    expect(res.send).toBeCalledWith(responseMessage);
    expect(res.status).toHaveBeenCalledWith(400);
    spyFindOneUserModel.mockClear();
  });
});
