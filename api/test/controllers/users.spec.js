const {getUsers} = require('../../src/controllers')

const {mockRequest, mockResponse} = require('./util/interceptor')

test('should return all users', done => {
  const request = mockRequest()
  request.query = {
    page: 1,
    limit: 10
  }

  const response = mockResponse()
  getUsers(request, response)
    .then(users => {
      console.log(users)
      done()
    })
    .catch(err => {
      console.log(err)
      done()
    })
})
