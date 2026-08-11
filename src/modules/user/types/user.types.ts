import { HydratedDocument } from "mongoose"

export enum GenderEnum {
  male,
  female,
}

export enum ProviderEnum {
  system,
  google,
}

export enum RoleEnum {
  user,
  admin,
}

export interface IUser{
  name: string
  email: string
  password: string
  phone: string
  age: number
  gender: GenderEnum
  isOnline?: boolean
  isActive?: boolean
  confirmedAt: Date
  changedCredentialsAt: Date
  provider: ProviderEnum
  role: RoleEnum
  profilePic: string
  coverPics: string[]
  bio?: string
  createdAt?:Date,
  updatedAt?:Date,
}

export type HUser = HydratedDocument<IUser>