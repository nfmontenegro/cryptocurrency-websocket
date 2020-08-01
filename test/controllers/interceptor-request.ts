let req;
req = {};
req.body = jest.fn().mockReturnValue(req);
req.headers = jest.fn().mockReturnValue(req);
req.params = jest.fn().mockReturnValue(req);

let res;
res = {};
res.send = jest.fn().mockReturnValue(res);
res.json = jest.fn().mockReturnValue(res);
res.status = jest.fn().mockReturnValue(res);

const next = jest.fn();

export {req, res, next};
