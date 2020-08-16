export {};
const request = require("supertest");
const {app} = require("../../src/app");
const mockUserData = require("../mocks/user");

const mockFindOne = jest.fn();
const mockVerifyToken = jest.fn();
const mockGetAll = jest.fn();
const mockComparePasswords = jest.fn();

jest.mock("jsonwebtoken", () => ({
  verify: () => mockVerifyToken(),
  sign: jest.fn()
}));

jest.mock("../../src/dao", () => ({
  getAll: () => mockGetAll(),
  findOne: () => mockFindOne()
}));

jest.mock("../../src/libs/logger", () => ({
  info: () => jest.fn(),
  debug: () => jest.fn()
}));

jest.mock("../../src/libs/bcrypt", () => ({
  comparePasswords: () => mockComparePasswords()
}));

describe("GetUsers router", () => {
  afterEach(() => {
    mockFindOne.mockClear();
    mockVerifyToken.mockClear();
    mockGetAll.mockClear();
    mockComparePasswords.mockClear();
  });

  it("should response success 200", async () => {
    mockFindOne.mockResolvedValue(true);
    mockVerifyToken.mockReturnValue({userId: "X"});
    mockGetAll.mockResolvedValue(mockUserData);

    const res = await request(app).get("/api/v1/users").set({
      authorization: "Bearer X"
    });

    expect(res.statusCode).toEqual(200);
    expect(res.ok).toBe(true);
    expect(res.type).toEqual("application/json");
  });

  it("should response forbidden 403", async () => {
    const res = await request(app).get("/api/v1/users");

    expect(res.statusCode).toEqual(401);
    expect(res.ok).toBe(false);
    expect(res.type).toEqual("application/json");
  });

  it("should response unauthorized 401", async () => {
    mockFindOne.mockResolvedValue(false);

    const res = await request(app).get("/api/v1/users").set({authorization: "Bearer X"});

    expect(res.statusCode).toEqual(401);
    expect(res.ok).toBe(false);
    expect(res.type).toEqual("application/json");
  });

  it("should response unauthorized 401 if token have one error", async () => {
    mockFindOne.mockResolvedValue(false);
    mockVerifyToken.mockReturnValue(false);
    const res = await request(app).get("/api/v1/users").set({authorization: "Bearer X"});

    expect(res.statusCode).toEqual(401);
    expect(res.ok).toBe(false);
    expect(res.type).toEqual("application/json");
  });
});

describe("Login router", () => {
  afterEach(() => {
    mockFindOne.mockClear();
    mockVerifyToken.mockClear();
    mockGetAll.mockClear();
    mockComparePasswords.mockClear();
  });

  it("should return 404 if the users is not found", async () => {
    mockFindOne.mockResolvedValue(false);

    const res = await request(app).post("/api/v1/login").send({email: "X", password: "X"});

    expect(res.statusCode).toEqual(404);
    expect(res.ok).toBe(false);
    expect(res.type).toEqual("application/json");

    expect(mockFindOne).toHaveBeenCalled();
    expect(mockFindOne).toHaveBeenCalledTimes(1);
  });

  it("should return 400 if the password are not valid", async () => {
    mockFindOne.mockResolvedValue(true);
    mockComparePasswords.mockResolvedValue(false);

    const res = await request(app).post("/api/v1/login").send({email: "X", password: "X"});

    expect(res.statusCode).toEqual(400);
    expect(res.ok).toBe(false);
    expect(res.type).toEqual("application/json");

    expect(mockFindOne).toHaveBeenCalled();
    expect(mockFindOne).toHaveBeenCalledTimes(1);

    expect(mockComparePasswords).toHaveBeenCalled();
    expect(mockComparePasswords).toHaveBeenCalledTimes(1);
  });

  it("should return 200 if the credentials are valids", async () => {
    mockFindOne.mockResolvedValue(true);
    mockComparePasswords.mockResolvedValue(true);
    mockVerifyToken.mockReturnValue(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    );

    const res = await request(app).post("/api/v1/login").send({email: "X", password: "X"});

    expect(res.statusCode).toBe(200);
    expect(res.ok).toBe(true);
    expect(res.type).toEqual("application/json");

    expect(mockFindOne).toHaveBeenCalled();
    expect(mockFindOne).toHaveBeenCalledTimes(1);

    expect(mockComparePasswords).toHaveBeenCalled();
    expect(mockComparePasswords).toHaveBeenCalledTimes(1);
  });
});
