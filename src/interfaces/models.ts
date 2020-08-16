interface IUser {
  uuid: string;
  email: string;
  password: string;
  name: string;
  lastname: string;
}

interface IPost {
  uuid: string;
  title: string;
  content: string;
  userId: string;
}

export {IUser, IPost};
