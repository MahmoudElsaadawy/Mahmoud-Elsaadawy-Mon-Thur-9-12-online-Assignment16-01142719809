import { HydratedDocument, Types } from "mongoose"

export enum PostPrivacyEnum {
  public,
  friends,
  private
}

export interface IPost {
  title: string
  content: string
  attachments: Array<string>
  likes: Array<Types.ObjectId>
  privacy: PostPrivacyEnum
  comments: Array<Types.ObjectId>
  createdBy: Types.ObjectId
}

export type HPost = HydratedDocument<IPost>