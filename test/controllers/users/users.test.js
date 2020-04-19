const {usersMockData} = require('../../__mocks__')
const {getUser, getUsers, registerUser, deleteUser, login, userProfile} = require('../../../src/controllers')

const {mockRequest, mockResponse} = require('./util/interceptor')

describe('Test user controllers', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const request = mockRequest()
  const response = mockResponse()

  request.query = {
    page: 1,
    limit: 10
  }

  response.json = jest.fn(() => usersMockData)

  test('should return all users', async () => {
    const requestGetUsers = await getUsers(request, response)
    expect(response.json).toHaveBeenCalledTimes(1)
    expect(response.status).toHaveBeenCalledTimes(1)
    expect(response.status).toHaveBeenCalledWith(200)

    expect(requestGetUsers).toEqual([
      {
        name: 'Nicolas',
        email: 'nico123@gmail.com',
        lastname: 'Flores',
        id: 1,
        password: '$2a$10$DDP.K5NlbqqiXZ13SZ9.TuAulCjc066UlaLy7QeyklXPnppy67FWK'
      }
    ])
  })

  test('should return one user', async () => {
    request.params = {
      id: '1'
    }

    response.json = jest.fn(() => usersMockData[0])

    const requestGetUser = await getUser(request, response)
    expect(response.json).toHaveBeenCalledTimes(1)
    expect(response.status).toHaveBeenCalledTimes(1)
    expect(response.status).toHaveBeenCalledWith(200)

    expect(requestGetUser).toEqual({
      name: 'Nicolas',
      email: 'nico123@gmail.com',
      lastname: 'Flores',
      id: 1,
      password: '$2a$10$DDP.K5NlbqqiXZ13SZ9.TuAulCjc066UlaLy7QeyklXPnppy67FWK'
    })
  })

  test('should return user not found', async () => {
    request.params = {
      id: '11111123123'
    }

    response.json = jest.fn(() => ({message: 'User not found'}))

    const requestGetUser = await getUser(request, response)
    expect(requestGetUser).toEqual({message: 'User not found'})
    expect(response.json).toHaveBeenCalledTimes(1)
    expect(response.status).toHaveBeenCalledTimes(1)
    expect(response.status).toHaveBeenCalledWith(404)
  })

  test('should return error if dont have id params', async () => {
    request.params = {}
    response.json = jest.fn(() => ({message: 'Param resource not found'}))

    const requestGetUser = await getUser(request, response)

    expect(response.json).toHaveBeenCalledTimes(1)
    expect(response.status).toHaveBeenCalledTimes(1)
    expect(response.status).toHaveBeenCalledWith(400)

    expect(requestGetUser).toEqual({message: 'Param resource not found'})
  })

  test('Should create user', async () => {
    const mockUser = {
      name: 'Nicolás Camilo',
      lastname: 'Flores Montenegro',
      email: 'nico@gmail.com',
      password: '12345678'
    }

    request.body = mockUser

    response.json = jest.fn(() => mockUser)

    const requestRegisterUser = await registerUser(request, response)

    expect(response.json).toHaveBeenCalledTimes(1)
    expect(response.status).toHaveBeenCalledTimes(1)
    expect(response.status).toHaveBeenCalledWith(201)

    expect(requestRegisterUser).toBe(mockUser)
  })

  test('should return error if user exist', async () => {
    const mockUser = {
      name: 'Nicolás Camilo',
      lastname: 'Flores Montenegro',
      email: 'nico123@gmail.com',
      password: '12345678'
    }

    request.body = mockUser
    response.json = jest.fn(() => ({message: `User with email ${mockUser.email} exist`}))

    const requestRegisterUser = await registerUser(request, response)

    expect(response.json).toHaveBeenCalledTimes(1)
    expect(response.status).toHaveBeenCalledTimes(1)
    expect(response.status).toHaveBeenCalledWith(400)

    expect(requestRegisterUser.message).toBe(`User with email nico123@gmail.com exist`)
  })

  test('should return user not found when try to delete one user', async () => {
    request.params = {
      id: '1111'
    }

    response.json = jest.fn(() => ({message: 'User not found'}))

    const requestDeleteUser = await deleteUser(request, response)

    expect(response.json).toHaveBeenCalledTimes(1)
    expect(response.status).toHaveBeenCalledTimes(1)
    expect(response.status).toHaveBeenCalledWith(404)

    expect(requestDeleteUser.message).toBe('User not found')
  })

  test('should login user with correct credentials', async () => {
    request.body = {
      email: 'nico123@gmail.com',
      password: '123'
    }

    const requestUserLogin = await login(request, response)

    expect(response.json).toHaveBeenCalledTimes(1)
    expect(response.status).toHaveBeenCalledTimes(1)
    expect(response.status).toHaveBeenCalledWith(200)
  })

  test('should return error login with not correct email', async () => {
    request.body = {
      email: 'nico1234@gmail.com',
      password: '123'
    }

    const requestUserLogin = await login(request, response)

    expect(response.json).toHaveBeenCalledTimes(1)
    expect(response.status).toHaveBeenCalledTimes(1)
    expect(response.status).toHaveBeenCalledWith(400)
  })

  test('should return error login with not correct password', async () => {
    request.body = {
      email: 'nico123@gmail.com',
      password: '12345678'
    }

    const requestUserLogin = await login(request, response)

    expect(response.json).toHaveBeenCalledTimes(1)
    expect(response.status).toHaveBeenCalledTimes(1)
    expect(response.status).toHaveBeenCalledWith(400)
  })

  test('should return user not found with id', async () => {
    request.token = {
      userId: '11122233322AAAABBBCCC',
      iat: 1586494860,
      exp: 1586495160
    }

    const requestUserProfile = await userProfile(request, response)

    expect(requestUserProfile.message).toBe('User not found')
    expect(response.json).toHaveBeenCalledTimes(1)
    expect(response.status).toHaveBeenCalledTimes(1)
    expect(response.status).toHaveBeenCalledWith(404)
  })

  test('should return user profile', async () => {
    request.token = {
      userId: '1',
      iat: 1586494860,
      exp: 1586495160
    }

    response.json = jest.fn(() => usersMockData[0])
    const requestUserProfile = await userProfile(request, response)

    expect(requestUserProfile).toBe(usersMockData[0])
    expect(response.json).toHaveBeenCalledTimes(1)
    expect(response.status).toHaveBeenCalledTimes(1)
    expect(response.status).toHaveBeenCalledWith(200)
  })
})
