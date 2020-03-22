const {usersMockData} = require('../../__mocks__')
const {getUser, getUsers} = require('../../../src/controllers')

const {mockRequest, mockResponse} = require('./util/interceptor')

test('should return all users', async () => {
  const request = mockRequest()
  const response = mockResponse()

  request.query = {
    page: 1,
    limit: 10
  }

  response.json = jest.fn(() => usersMockData)

  const requestGetUsers = await getUsers(request, response)
  expect(response.json).toHaveBeenCalledTimes(1)
  expect(response.status).toHaveBeenCalledTimes(1)
  expect(response.status).toHaveBeenCalledWith(200)

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

// test('should return one user', async () => {
//   const request = mockRequest()
//   const response = mockResponse()

//   request.params = {
//     id: 'ck825lukf009s07498txoai9r'
//   }

//   const requestGetUser = await getUser(request, response)
//   expect(response.json).toHaveBeenCalledTimes(1)
//   expect(response.status).toHaveBeenCalledTimes(1)
//   expect(response.status).toHaveBeenCalledWith(200)

//   expect(requestGetUser).toEqual({
//     name: 'Nicolas',
//     email: 'nico123@gmail.com',
//     lastname: 'Flores',
//     id: 'ck825lukf009s07498txoai9r',
//     password: '$2a$10$DDP.K5NlbqqiXZ13SZ9.TuAulCjc066UlaLy7QeyklXPnppy67FWK'
//   })
// })

// test('should return user not found', async () => {
//   const request = mockRequest()
//   const response = mockResponse()

//   request.params = {
//     id: '11111'
//   }

//   const requestGetUser = await getUser(request, response)
//   expect(requestGetUser).toEqual({message: 'User not found'})
// })

// test('should return error if dont have id params', async () => {
//   const request = mockRequest()
//   const response = mockResponse()

//   request.params = {}

//   const requestGetUser = await getUser(request, response)

//   expect(response.json).toHaveBeenCalledTimes(1)
//   expect(response.status).toHaveBeenCalledTimes(1)
//   expect(response.status).toHaveBeenCalledWith(400)

//   expect(requestGetUser).toEqual({message: 'Param resource not found'})
// })
