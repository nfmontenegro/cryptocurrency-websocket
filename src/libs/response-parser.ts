import {IErrorMessage} from "../interfaces/messages";

function getErrorResponseMessage(
  statusCode: number = 500,
  message: string = "",
  error: string = "Internal server error"
): IErrorMessage {
  return {
    statusCode,
    message,
    error
  };
}
export {getErrorResponseMessage};
