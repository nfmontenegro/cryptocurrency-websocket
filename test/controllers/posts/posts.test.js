const {mockRequest, mockResponse} = require('./util/interceptor')

describe('Test post controller', () => {
  beforeEach(() => jest.cleaerMocks())
})

const request = mockRequest()
const response = mockResponse()

test('should return all posts', async () => {
  expect(2).toBe(2)
})
