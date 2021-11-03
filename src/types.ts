export type TUser = {
  _id: string;
  nickname: string;
  fullname: string;
  avatar: string;
  hobby: string;
  age: string;
  about: string;
  occupation: string;
  favoutires: string[];
};

export type TTokenPayload = {
  _id: string;
  nickname: string;
};
