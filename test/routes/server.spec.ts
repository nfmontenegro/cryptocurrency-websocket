export {};
const request = require("supertest");
const {app} = require("../../src/app");

const mockFindOne = jest.fn();
const mockVerifyToken = jest.fn();
jest.mock("jsonwebtoken", () => ({
  verify: () => mockVerifyToken()
}));

jest.mock("../../src/dao/user", () => ({
  getAll: () => jest.fn(),
  findOne: () => mockFindOne()
}));

describe("GetUsers router", () => {
  it("should response success 200", async () => {
    mockFindOne.mockResolvedValue(true);
    mockVerifyToken.mockReturnValue({userId: "X"});
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
