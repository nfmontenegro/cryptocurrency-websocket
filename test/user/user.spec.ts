const mockUserData = require("../mocks/user");
const logger = require("../../src/util/logger");
const db = require("../../src/database/models");
const {comparePasswords} = require("../../src/lib/bcrypt");
const {login, createUser} = require("../../src/controllers");
const {req, res, next} = require("../interceptor-request");

jest.mock("jsonwebtoken", (): any => ({
  sign: jest.fn()
}));
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
jest.mock("../../src/lib/bcrypt", (): any => ({
  comparePasswords: jest.fn(),
  hashPassword: jest.fn()
}));

describe("login user test", (): void => {
  afterEach((): void => {
    jest.clearAllMocks();
  });

  test("should return 404 user not found", async (): Promise<void> => {
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
    expect(next).toBeCalledWith({error: "Not Found", message: "No such user found fake2@gmail.com", statusCode: 404});
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

describe("create user test", (): void => {
  afterEach((): void => {
    jest.clearAllMocks();
  });

  test("should return 201 and create user", async (): Promise<void> => {
    req.body = {
      email: "fake@gmail.com",
      password: "12345678"
    };

    db.User.findOne.mockReturnValueOnce(false);
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
    req.body = {
      email: "fake@gmail.com",
      password: "12345678"
    };

    db.User.findOne.mockReturnValueOnce(true);

    await createUser(req, res, next);

    const spyLogger = jest.spyOn(logger, "debug");
    expect(spyLogger).toHaveBeenCalled();

    const spyFindAllUserModel = jest.spyOn(db.User, "findOne");
    expect(spyFindAllUserModel).toHaveBeenCalled();

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toBeCalledWith({error: "Conflict", message: "Email fake@gmail.com already exist!", statusCode: 409});
  });

  test("should return 204 empty request object", async (): Promise<void> => {
    req.body = {};

    await createUser(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toBeCalledWith({error: "No Content", message: "", statusCode: 204});
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
