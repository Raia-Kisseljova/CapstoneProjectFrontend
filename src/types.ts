export enum Role {
  USER = 'BasicUser',
  ORGANISATION = 'Organisation',
}

export type TUser = {
  _id: string;
  role: 'BasicUser';
  nickname: string;
  fullname: string;
  avatar: string;
  hobby: string;
  dateOfBirth: string;
  about: string;
  occupation: string;
  favoutires: string[];
};

export type TOrganisation = {
  _id: string;
  role: 'Organisation';
  name: string;
  avatar: string;
  about: string;
  location: string;
  website: string;
};

export type TTokenPayload = {
  _id: string;
  nickname: string;
  role: Role;
};
