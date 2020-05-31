module.exports = {
  mockRequest: () => {
    const req = {}
    req.prisma = {
      disconnect: () => null
    }
    return req
  },
  mockResponse: () => {
    const res = {}
    return res
  }
}
