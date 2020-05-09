const {usersMockData} = require('../../../__mocks__')

module.exports = {
  mockRequest: () => {
    const req = {}
    req.body = jest.fn().mockReturnValue(req)
    req.params = jest.fn().mockReturnValue(req)
    req.query = jest.fn().mockReturnValue(req)
    req.prisma = {
      disconnect: {},
      user: {
        findMany: () => usersMockData,
        findOne: ({where: {id, email}}) => {
          const userFake = usersMockData[0]
          return id === userFake.id ? userFake : null || email === userFake.email ? userFake : null
        },
        create: user => {
          2
          usersMockData.push({id: 12345678, ...user.data})
          return user
        },
        delete: ({where: {id}}) => {
          const findUser = usersMockData.find(user => user.id === id)
          if (findUser) {
            return usersMockData.filter(user => user.id !== id)
          } else {
            return null
          }
        }
      }
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
