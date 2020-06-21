import {IErrorMessage} from "../interfaces/messages";

function errorResponseMessage(message: string, statusCode: number): IErrorMessage {
  return {
    result: [
      {
        status: "failure",
        error: {
          code: statusCode,
          message: `Error:  ${message}`
        }
      }
    ]
  };
}

export default errorResponseMessage;
