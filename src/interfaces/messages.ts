interface IErrorMessage {
  result: IMessage[];
}

interface IMessage {
  status: string;
  error: {
    code: number;
    message: string;
  };
}

export {IErrorMessage};
