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
  location: string;
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

export type TAnimal = {
  _id: string;
  petName: string;
  breed: string;
  type: string;
  gender: string;
  images: string[];
  location: string;
  description: string;
  canLiveWithPets: boolean;
  canLiveWithChildren: boolean;
  indoorOnly: boolean;
  dateOfBirth: string;
};

// export type TAnimalCreate = Omit<TAnimal, '_id'>;
// export type TAnimalUpdate = Partial<TAnimalCreate>;
