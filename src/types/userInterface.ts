export interface IResponseCreateUser {
  email: string;
  password: string;
  name: string;
  avatar: string;
  role: string;
  id: number;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  avatar: string;
}
