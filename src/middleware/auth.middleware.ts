import { Request, Response, NextFunction } from "express"
import { UnauthorizedException, BadRequestException } from "../utils/error.exceptions"
import { verifyToken } from "../utils/security/token"
import User from "../modules/user/models/user.model"
import { jwtIdKey, redisGet } from "../utils/redis/redis.service" 
import { IUser } from "../modules/user/types/user.types"

declare module "express-serve-static-core" {
  interface Request {
  user?: IUser
  }
}

export enum Tokens {
  access= "accessToken",
  refresh= "refreshToken"
}

export const auth = async(req: Request, res: Response, next: NextFunction)=> {
  const { authorization } = req.headers
  const { user } = await decodeToken(authorization, Tokens.access)
  req.user = user
  next()
}

export const decodeToken = async(authorization: string | undefined, tokenType: Tokens = Tokens.access)=> {
  if(!authorization) {
    throw new UnauthorizedException()
  }
  if(!authorization.startsWith("Bearer")) {
    throw new BadRequestException("Invalid authorization method")
  }
  const token = authorization.split(" ")[1] as string
  if(!token) {
    throw new UnauthorizedException()
  }
  const jwtKey = tokenType == Tokens.refresh? process.env.REFRESH_JWT : process.env.ACCESS_JWT
  if(!jwtKey){
    throw new BadRequestException("Env key not found")
  }
  const payload = verifyToken(token, jwtKey) as {
    id: string,
    iat: number,
    exp: number,
    jti: string
  }
  const user = await User.findById(payload.id)
  if(!user) {
    throw new UnauthorizedException()
  }
  if (!user.confirmedAt) {
    throw new BadRequestException("Please confirm your email first")
  }

  const sessionAccessKey = jwtIdKey(user.id, tokenType)
  const session = await redisGet(sessionAccessKey)

  if (session != payload.jti) {
    throw new UnauthorizedException()
  }
  return { user }
}