import {IErrorMessage} from "../interfaces/messages";

function errorMessage(
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
export {errorMessage};
