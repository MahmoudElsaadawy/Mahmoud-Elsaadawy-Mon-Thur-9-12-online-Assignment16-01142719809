import { redisClient } from "../../DB/redis.connection"

export const redisSet = async(path: string, value: string, time: number)=> {
  return await redisClient.set(path, value, {
    expiration: {
      type: "EX",
      value: time * 60,
    }
  })
}

export const redisGet = (path: string)=> {
  return redisClient.get(path)
}

export const redisDel = (path: string)=> {
  return redisClient.del(path)
}

export const redisTTL = (path: string)=> {
  return redisClient.TTL(path)
}

export const redisKeys = (path: string)=> {
  return redisClient.keys(path)
}

export const generateOtpKey = (userId: string)=> {
  return `Users:${userId}:confirmEmailOtp`
}

export const jwtIdKey = (userId: string, tokenType: string)=> {
  return `Users:${userId}:login:${tokenType}`
}