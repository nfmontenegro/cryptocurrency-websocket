describe('callMyFunction function', () => {
  it('calls the passed function', () => {
    const callback = jest.fn()
    callback()
    expect(callback).toHaveBeenCalledTimes(1)
  })
})
