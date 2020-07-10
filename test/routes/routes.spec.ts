const request = require("supertest");
const {app} = require("../../src/app");

jest.mock("../../src/middlewares/auth-token", () => ({
  verifyToken: () => jest.fn()
}));
jest.mock("../../src/util/logger.ts", () => ({
  info: jest.fn(),
  debug: jest.fn()
}));

const mockGetRouter = jest.fn();
jest.doMock("express", () => {
  return () => ({
    NextFunction: jest.fn(),
    Router() {
      return {
        get: mockGetRouter
      };
    }
  });
});

describe("Post Endpoints", () => {
  it("should create a new post", async () => {
    const res = await request(app).get("/api/v1/users");
    expect(res.statusCode).toEqual(200);
  });
});
