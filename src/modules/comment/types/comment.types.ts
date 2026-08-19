import { HydratedDocument, Types } from "mongoose"

export interface IComment {
  text?: string
  attachments?: Array<string>
  likes?: Array<Types.ObjectId>
  createdBy: Types.ObjectId
}

export type HComment = HydratedDocument<IComment>