import db from "../../src/database/models";
import {login} from "../../src/controllers";
import {req, res, next} from "../interceptor-request";

jest.mock("../../src/util/logger", (): object => ({
  debug: jest.fn(),
  info: jest.fn()
}));
jest.mock("../../src/database/models", (): object => ({
  User: {
    findOne: jest.fn()
  }
}));

jest.mock("../../src/lib/bcrypt", (): any => ({
  comparePasswords: jest.fn().mockReturnValueOnce(false).mockReturnValueOnce(true)
}));

describe("login user test", (): void => {
  afterEach((): void => {
    jest.clearAllMocks();
  });

  test("should return 400 user not found", async (): Promise<void> => {
    req.body = {
      email: "fake2@gmail.com",
      password: "12345678"
    };

    db.User.findOne.mockReturnValue(false);
    await login(req, res, next);
    const spyFindOneUserModel = jest.spyOn(db.User, "findOne");
    expect(spyFindOneUserModel).toHaveBeenCalled();

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toBeCalledWith({error: "Bad Request", message: "No such user found fake2@gmail.com", statusCode: 400});
  });

  test("should return 400 wrong password", async (): Promise<void> => {
    req.body = {
      email: "fake2@gmail.com",
      password: "12345678"
    };

    db.User.findOne.mockReturnValue(req.body);

    await login(req, res, next);
    const spyFindOneUserModel = jest.spyOn(db.User, "findOne");
    expect(spyFindOneUserModel).toHaveBeenCalled();

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toBeCalledWith({error: "Bad Request", message: "Invalid password", statusCode: 400});
  });

  test("should return 200 success login", async (): Promise<void> => {
    req.body = {
      email: "fake@gmail.com",
      password: "12345678"
    };

    db.User.findOne.mockReturnValueOnce(true);
    await login(req, res, next);

    const spyFindOneUserModel = jest.spyOn(db.User, "findOne");
    expect(spyFindOneUserModel).toHaveBeenCalled();

    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(1);

    expect(res.status).toHaveBeenCalledWith(200);
  });
});
