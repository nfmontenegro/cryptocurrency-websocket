const {usersMockData} = require('../../../__mocks__')

module.exports = {
  mockRequest: () => {
    const req = {}
    req.body = jest.fn().mockReturnValue(req)
    req.params = jest.fn().mockReturnValue(req)
    req.query = jest.fn().mockReturnValue(req)
    req.prisma = {
      users: () => usersMockData,
      user: () => usersMockData[0],
      createUser: user => ({
        id: '11111',
        ...user
      })
    }
    return req
  },

  mockResponse: () => {
    const res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.send = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    return res
  }
}
