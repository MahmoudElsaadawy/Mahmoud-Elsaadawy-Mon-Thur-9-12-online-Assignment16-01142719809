import jwt from "jsonwebtoken"

export const generateToken = (payload: string|object, sign: jwt.Secret, options: jwt.SignOptions={})=> {
  const token = jwt.sign(payload, sign, options)
  return token
}

export const verifyToken = (token: string, sign: jwt.Secret, options: jwt.VerifyOptions={})=> {
  const payload = jwt.verify(token, sign, options)
  return payload
}