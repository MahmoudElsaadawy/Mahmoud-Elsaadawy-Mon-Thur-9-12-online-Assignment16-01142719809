import { customAlphabet } from "nanoid"

export const generateOtp = ()=> {
  const randomInt = customAlphabet("0123456789")
  return randomInt(6)
}