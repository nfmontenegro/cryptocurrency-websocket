module.exporst = {
  mockRequest: () => {
    const req = {}
    req.prisma = {
      disconnect: {}
    }
    return req
  },
  mockResponse: () => {
    const res = {}
    return res
  }
}
