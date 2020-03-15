const {getUsers} = require('../../src/controllers')

const res = {
  status: jest.fn(),
  json: jest.fn(() => [{name: 'nicolas'}]),
  err: {
    message: 'test error'
  }
}

const req = {
  query: {
    page: 1,
    limit: 5
  }
}

test('should return all users', done => {
  getUsers(req, res)
    .then(users => {
      console.log(users)
      done()
    })
    .catch(err => {
      console.log(err)
      done()
    })
})
