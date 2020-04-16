const {usersMockData} = require('../../../__mocks__')

module.exports = {
  mockRequest: () => {
    const req = {}
    req.body = jest.fn().mockReturnValue(req)
    req.params = jest.fn().mockReturnValue(req)
    req.query = jest.fn().mockReturnValue(req)
    req.prisma = {
      users: () => usersMockData,
      user: ({id, email}) => {
        const user = usersMockData[0]
        return id === user.id ? user : null || email === user.email ? user : null
      },
      createUser: user => {
        usersMockData.push({id: '12345678', ...user})
        return user
      },
      deleteUser: ({id}) => {
        const user = usersMockData[0]
        return id === user.id ? user : null
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
