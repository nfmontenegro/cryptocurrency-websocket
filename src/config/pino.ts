import pino, {SerializedError, SerializedResponse} from 'pino';

const pinoConfig = {
  logger: pino({
    prettyPrint: {colorize: true},
    level: 'info',
    serializers: {
      err: pino.stdSerializers.err,
      req: pino.stdSerializers.req,
      res: pino.stdSerializers.res
    }
  }),
  customAttributeKeys: {
    req: 'request',
    res: 'response',
    err: 'error',
    responseTime: 'timeTaken'
  },
  wrapSerializers: true,
  customErrorMessage: (error: SerializedError, res: SerializedResponse): string => {
    return 'request errored with status code: ' + res.statusCode + 'and error: ' + error;
  }
};

export default pinoConfig;
