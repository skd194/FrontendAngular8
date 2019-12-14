import { IPhoto } from "./photo-models";

export class LoginUser {
  username: string;
  password: string;
}

export class RegisterUser extends LoginUser {
  gender: string;
  knownAs: string;
  city: string;
  country: string;
  interests?: string;
  lookingFor?: string;
  dateOfBirth: Date;
}

export interface IUser {
  id: number;
  username: string;
  knownAs: string;
  age: string;
  gender: string;
  createdOn: Date;
  lastActiveOn: Date;
  photoUrl: string;
  city: string;
  country: string;
  interests?: string;
  lookingFor?: string;
  photos?: IPhoto[];
  introduction: string;
}
