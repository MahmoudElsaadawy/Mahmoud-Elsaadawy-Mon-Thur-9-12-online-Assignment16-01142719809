import bcrypt from "bcrypt"

export const compare = async(data: string, hashedData: string)=> {
  return await bcrypt.compare(data, hashedData)
}

export const hash = async(data: string)=> {
  const hashedValue = await bcrypt.hash(data, 8)
  return hashedValue
}
