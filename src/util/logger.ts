import util from 'util';

const logger = {
  debug: (data: any): void => console.log(util.inspect(data, true, 3, true)),
  info: (message: string, data: any = null): void => console.log(message, util.inspect(data, true, 3, true))
};

export default logger;
