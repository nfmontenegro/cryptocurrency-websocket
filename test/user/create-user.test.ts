import mockUserData from "../mocks/user";
import logger from "../../src/util/logger";
import {createUser} from "../../src/controllers";
import {req, res, next} from "../interceptor-request";
import db from "../../src/database/models";

jest.mock("../../src/util/logger", (): object => ({
  debug: jest.fn(),
  info: jest.fn()
}));

jest.mock("../../src/database/models", (): object => ({
  User: {
    findOne: jest.fn(),
    create: jest.fn()
  }
}));

describe("user test", (): void => {
  afterEach((): void => {
    jest.clearAllMocks();
  });

  test("should return 201 and create user", async (): Promise<void> => {
    req.body = {
      name: "fake",
      lastname: "fake lastname",
      email: "fake2@gmail.com",
      password: "12345678"
    };

    db.User.create.mockReturnValueOnce(mockUserData);
    await createUser(req, res, next);

    const spyLogger = jest.spyOn(logger, "debug");
    expect(spyLogger).toHaveBeenCalled();

    const spyFindAllUserModel = jest.spyOn(db.User, "findOne");
    expect(spyFindAllUserModel).toHaveBeenCalled();

    const spyCreateUserModel = jest.spyOn(db.User, "create");
    expect(spyCreateUserModel).toHaveBeenCalled();

    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(1);

    expect(res.status).toHaveBeenCalledWith(201);

    expect(res.send).toBeCalledWith(mockUserData);
  });

  test("should return 409 email already exists", async (): Promise<void> => {
    req.body = mockUserData[0];
    db.User.findOne.mockReturnValueOnce(true);

    await createUser(req, res, next);

    const spyLogger = jest.spyOn(logger, "debug");
    expect(spyLogger).toHaveBeenCalled();

    const spyFindAllUserModel = jest.spyOn(db.User, "findOne");
    expect(spyFindAllUserModel).toHaveBeenCalled();

    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(1);

    expect(res.status).toHaveBeenCalledWith(409);

    expect(res.send).toBeCalledWith({result: [{error: {code: 409, message: "Error:  email fake@gmail.com already exists!"}, status: "failure"}]});
  });

  test("should return 204 empty request object", async (): Promise<void> => {
    req.body = {};

    await createUser(req, res, next);

    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(1);

    expect(res.status).toHaveBeenCalledWith(204);

    expect(res.send).toBeCalledWith({result: [{error: {code: 204, message: "Error:  "}, status: "failure"}]});
  });

  test("should return 500 error", async (): Promise<void> => {
    const mockFunction = jest.fn();
    createUser.prototype = mockFunction;
    mockFunction.mockRejectedValue("An error ocurred");

    try {
      await createUser(req, res, next);
    } catch (e) {
      expect(e).toBe("An Error Occurred");
    }
  });
});
