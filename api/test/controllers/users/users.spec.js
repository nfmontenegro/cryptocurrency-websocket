const {getUser, getUsers} = require('../../../src/controllers')

const {mockRequest, mockResponse} = require('./util/interceptor')

test('should return all users', async () => {
  const request = mockRequest()
  const response = mockResponse()

  request.query = {
    page: 1,
    limit: 10
  }

  const requestGetUsers = await getUsers(request, response)
  expect(response.status).toHaveBeenCalledTimes(1)
  expect(response.status).toHaveBeenCalledWith(200)

  const spyResponseStatus = jest.spyOn(response, 'status')
  expect(spyResponseStatus).toHaveBeenCalledTimes(1)

  const spyResponseJson = jest.spyOn(response, 'json')
  expect(spyResponseJson).toHaveBeenCalledTimes(1)
  expect(requestGetUsers).toEqual([
    {
      name: 'Nicolas',
      email: 'nico123@gmail.com',
      lastname: 'Flores',
      id: 'ck825lukf009s07498txoai9r',
      password: '$2a$10$DDP.K5NlbqqiXZ13SZ9.TuAulCjc066UlaLy7QeyklXPnppy67FWK'
    }
  ])
})

test('should return one user', async () => {
  const request = mockRequest()
  const response = mockResponse()

  request.params = {
    id: 'ck825lukf009s07498txoai9r'
  }

  const requestGetUser = await getUser(request, response)
  expect(response.status).toHaveBeenCalledTimes(1)
  expect(response.status).toHaveBeenCalledWith(200)

  expect(requestGetUser).toEqual({
    name: 'Nicolas',
    email: 'nico123@gmail.com',
    lastname: 'Flores',
    id: 'ck825lukf009s07498txoai9r',
    password: '$2a$10$DDP.K5NlbqqiXZ13SZ9.TuAulCjc066UlaLy7QeyklXPnppy67FWK'
  })
})

test('should return error if dont have id params', async () => {
  const request = mockRequest()
  const response = mockResponse()

  request.params = {}
  const requestGetUser = await getUser(request, response)

  expect(response.status).toHaveBeenCalledTimes(1)
  expect(response.status).toHaveBeenCalledWith(400)

  const spyResponseStatus = jest.spyOn(response, 'status')
  expect(spyResponseStatus).toHaveBeenCalledTimes(1)

  const spyResponseJson = jest.spyOn(response, 'json')
  expect(spyResponseJson).toHaveBeenCalledTimes(1)

  expect(requestGetUser).toEqual({message: 'Param resource not found'})
})
