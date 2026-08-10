import { BadRequestException } from "../error.exceptions";
import CryptoJS from "crypto-js";

export const encrypt = (data: string) => {
  const encKey = process.env.ENC_KEY;
  if (encKey) {
    const encryptedData = CryptoJS.AES.encrypt(data, encKey);
    return encryptedData.toString();
  }
  throw new BadRequestException("ENC_KEY env variable is not defined");
};

export const decrypt = (encryptedData: string) => {
  const encKey = process.env.ENC_KEY;
  if (encKey) {
    const decryptedData = CryptoJS.AES.decrypt(encryptedData, encKey);
    return decryptedData.toString(CryptoJS.enc.Utf8);
  }
  throw new BadRequestException("ENC_KEY env variable is not defined");
};
