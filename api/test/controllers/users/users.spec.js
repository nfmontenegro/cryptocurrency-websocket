const {getUsers} = require('../../../src/controllers')

const {mockRequest, mockResponse} = require('./util/interceptor')

test('should return all users', done => {
  const request = mockRequest()
  const response = mockResponse()

  request.query = {
    page: 1,
    limit: 10
  }

  getUsers(request, response).then(users => {
    expect(response.json).toHaveBeenCalledTimes(1)
    expect(response.status).toHaveBeenCalledTimes(1)
    expect(response.status).toHaveBeenCalledWith(200)
    done()
  })
})
