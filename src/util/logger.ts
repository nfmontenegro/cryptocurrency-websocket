import util from 'util';

const logger = {
  info: (data: any): void => console.log(util.inspect(data, true, 3, true)),
  debug: (message: string, data: any): void => console.log(message, util.inspect(data, true, 3, true))
};

export default logger;
