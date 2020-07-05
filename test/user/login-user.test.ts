const jwt = require("jsonwebtoken");
const {comparePasswords} = require("../../src/lib/bcrypt");
const db = require("../../src/database/models");
const {login} = require("../../src/controllers");
const {req, res, next} = require("../interceptor-request");

jest.mock("jsonwebtoken", (): any => {
  return {
    sign: jest.fn()
  };
});
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
  comparePasswords: jest.fn()
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
    comparePasswords.mockReturnValue(false);

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

    jwt.sign.mockReturnValue("lllll");

    db.User.findOne.mockReturnValueOnce(true);
    comparePasswords.mockReturnValue(true);
    await login(req, res, next);

    const spyFindOneUserModel = jest.spyOn(db.User, "findOne");
    expect(spyFindOneUserModel).toHaveBeenCalled();

    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(1);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("should return 500 error", async (): Promise<void> => {
    const mockFunction = jest.fn();
    login.prototype = mockFunction;
    mockFunction.mockRejectedValue("An error ocurred");

    try {
      await login(req, res, next);
    } catch (e) {
      expect(e).toBe("An Error Occurred");
    }
  });
});
