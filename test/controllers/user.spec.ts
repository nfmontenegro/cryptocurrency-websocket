const {getUsers, login, updateUser, createUser, getProfile} = require("../../src/controllers");
// const db = require("../../src/database/models");

const {req, res, next} = require("../interceptor-request");
const mockUsersData = require("../mocks/user");

const mockGetAll = jest.fn();
const mockFindOne = jest.fn();
const mockUpdate = jest.fn();
const mockCreate = jest.fn();
const mockHashPassword = jest.fn();
const mockComparePasswords = jest.fn();

jest.mock("jsonwebtoken");

jest.mock("../../src/database/models", () => ({
  db: {
    User: {
      findAll: () => mockGetAll()
    }
  }
}));

jest.mock("../../src/libs/bcrypt", () => ({
  comparePasswords: () => mockComparePasswords(),
  hashPassword: () => mockHashPassword()
}));

jest.mock("../../src/libs/logger", () => ({
  info: () => jest.fn(),
  debug: () => jest.fn()
}));

describe("GetUsers controller", () => {
  afterEach(() => {
    mockGetAll.mockClear();
  });

  it("should return success response 200", async () => {
    mockGetAll.mockResolvedValue(mockUsersData);
    req.query = {
      limit: 1,
      offset: 0
    };
    await getUsers(req, res, next);

    expect(mockGetAll).toHaveBeenCalled();
    expect(mockGetAll).toHaveBeenCalledTimes(1);

    expect(res.send).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith({result: {users: mockUsersData, limit: 1, offset: 0}});

    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("should return error message if get user controllers is failed", async () => {
    mockGetAll.mockRejectedValue("An error ocurred");
    await getUsers(req, res, next);

    expect(mockGetAll).toHaveBeenCalled();
    expect(mockGetAll).toHaveBeenCalledTimes(1);

    expect(res.send).not.toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledTimes(0);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledTimes(0);

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
  });
});

describe("Login controller", () => {
  afterEach(() => {
    mockGetAll.mockClear();
  });

  it("should return success message if login is succcess", async () => {
    const user = mockUsersData.usersData[0];
    mockFindOne.mockResolvedValue(user);
    mockComparePasswords.mockResolvedValue(true);
    req.body = {
      email: "X",
      password: "X"
    };

    await login(req, res, next);

    expect(mockFindOne).toHaveBeenCalled();
    expect(mockFindOne).toHaveBeenCalledTimes(1);

    expect(mockComparePasswords).toHaveBeenCalled();
    expect(mockComparePasswords).toHaveBeenCalledTimes(1);

    expect(res.send).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith({result: {user}});

    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("should call next middleware when user email don't exist", async () => {
    mockFindOne.mockResolvedValue(false);

    req.body = {
      email: "X",
      password: "X"
    };

    await login(req, res, next);

    expect(mockFindOne).toHaveBeenCalled();
    expect(mockFindOne).toHaveBeenCalledTimes(1);

    expect(mockComparePasswords).not.toHaveBeenCalled();
    expect(mockComparePasswords).toHaveBeenCalledTimes(0);

    expect(res.send).not.toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("should call next middleware when user password is not valid", async () => {
    mockFindOne.mockResolvedValue(true);
    mockComparePasswords.mockResolvedValue(false);

    req.body = {
      email: "X",
      password: "X"
    };

    await login(req, res, next);

    expect(mockFindOne).toHaveBeenCalled();
    expect(mockFindOne).toHaveBeenCalledTimes(1);

    expect(mockComparePasswords).toHaveBeenCalled();
    expect(mockComparePasswords).toHaveBeenCalledTimes(1);

    expect(res.send).not.toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("should return error message if find one is failed", async () => {
    mockFindOne.mockRejectedValue("An error ocurred");
    await login(req, res, next);

    expect(mockFindOne).toHaveBeenCalled();
    expect(mockFindOne).toHaveBeenCalledTimes(1);

    expect(mockComparePasswords).not.toHaveBeenCalled();
    expect(mockComparePasswords).toHaveBeenCalledTimes(0);

    expect(res.send).not.toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledTimes(0);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledTimes(0);

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("should return error message if comparePasswords is failed", async () => {
    mockFindOne.mockResolvedValue(true);
    mockComparePasswords.mockRejectedValue(false);
    await login(req, res, next);

    expect(mockFindOne).toHaveBeenCalled();
    expect(mockFindOne).toHaveBeenCalledTimes(1);

    expect(mockComparePasswords).toHaveBeenCalled();
    expect(mockComparePasswords).toHaveBeenCalledTimes(1);

    expect(res.send).not.toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledTimes(0);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledTimes(0);

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
  });
});

describe("Update controller", () => {
  afterEach(() => {
    mockGetAll.mockClear();
  });

  it("should return success message if update user is succcess", async () => {
    const user = mockUsersData.usersData[0];
    mockUpdate.mockResolvedValue(user);

    req.params = {
      userId: "1"
    };
    req.body = {
      email: "X",
      password: "X"
    };

    await updateUser(req, res, next);

    expect(mockUpdate).toHaveBeenCalled();
    expect(mockUpdate).toHaveBeenCalledTimes(1);

    expect(res.send).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith({result: {user}});

    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("should return error when params is not a number", async () => {
    mockUpdate.mockResolvedValue(false);

    req.params = {
      userId: "X"
    };
    req.body = {
      email: "X",
      password: "X"
    };

    await updateUser(req, res, next);

    expect(mockUpdate).not.toHaveBeenCalled();
    expect(mockUpdate).toHaveBeenCalledTimes(0);

    expect(res.send).not.toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledTimes(0);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledTimes(0);

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("should return error when try update and can't find the user", async () => {
    mockUpdate.mockResolvedValue(false);

    req.params = {
      userId: "1"
    };
    req.body = {
      email: "X",
      password: "X"
    };

    await updateUser(req, res, next);

    expect(mockUpdate).toHaveBeenCalled();
    expect(mockUpdate).toHaveBeenCalledTimes(1);

    expect(res.send).not.toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledTimes(0);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledTimes(0);

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("should return error if updated controller is failed", async () => {
    mockUpdate.mockRejectedValue("An error ocurred");
    await updateUser(req, res, next);

    expect(mockUpdate).toHaveBeenCalled();
    expect(mockUpdate).toHaveBeenCalledTimes(1);

    expect(res.send).not.toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledTimes(0);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledTimes(0);

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
  });
});

describe("Create controller", () => {
  afterEach(() => {
    mockGetAll.mockClear();
  });

  it("should return success message if create is succcess", async () => {
    const user = mockUsersData.usersData[0];
    mockFindOne.mockResolvedValue(false);
    mockCreate.mockResolvedValue(user);
    mockHashPassword.mockResolvedValue(user.password);

    req.body = {
      email: "X",
      password: "X"
    };

    await createUser(req, res, next);

    expect(mockCreate).toHaveBeenCalled();
    expect(mockCreate).toHaveBeenCalledTimes(1);

    expect(mockFindOne).toHaveBeenCalled();
    expect(mockFindOne).toHaveBeenCalledTimes(1);

    expect(res.send).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith({result: user});

    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it("should return error message if dont send body request", async () => {
    req.body = {};

    await createUser(req, res, next);

    expect(mockCreate).not.toHaveBeenCalled();
    expect(mockCreate).toHaveBeenCalledTimes(0);

    expect(mockFindOne).not.toHaveBeenCalled();
    expect(mockFindOne).toHaveBeenCalledTimes(0);

    expect(res.send).not.toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledTimes(0);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledTimes(0);

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("should return error message if email already exist", async () => {
    mockFindOne.mockResolvedValue(true);

    req.body = {
      email: "X",
      password: "X"
    };

    await createUser(req, res, next);

    expect(mockFindOne).toHaveBeenCalled();
    expect(mockFindOne).toHaveBeenCalledTimes(1);

    expect(mockCreate).not.toHaveBeenCalled();
    expect(mockCreate).toHaveBeenCalledTimes(0);

    expect(res.send).not.toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledTimes(0);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledTimes(0);

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
  });
});

describe("GetProfile controller", () => {
  afterEach(() => {
    mockGetAll.mockClear();
  });

  it("should calls get user profile controller", async () => {
    await getProfile(req, res, next);
  });

  it("should handle error 500 when its fails", async () => {
    expect(getProfile(req, res, next)).rejects;
  });
});
