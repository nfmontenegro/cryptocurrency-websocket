const {getUsers} = require("../../src/controllers/user");

const mockUsersData = require("./mocks/user");
const {req, res, next} = require("./interceptor-request");

const mockGetUsers = jest.fn();
// jest.mock("../../src/controllers/user", () => ({
//   getUsers: () => mockGetUsers()
// }));
const mockGetAll = jest.fn();
jest.mock("../../src/dao/user", () => ({
  getAll: () => mockGetAll()
}));

describe("getUsers controller", () => {
  afterEach(() => {
    mockGetAll.mockClear();
  });

  it("should return success response 200", async () => {
    mockGetAll.mockResolvedValue(mockUsersData);
    await getUsers(req, res, next);

    expect(res.send).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith({result: mockUsersData});

    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("should return error message if get user controllers is failed", async () => {
    mockGetAll.mockRejectedValue("An error ocurred");
    await getUsers(req, res, next);

    expect(res.send).not.toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledTimes(0);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledTimes(0);

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
  });
});
