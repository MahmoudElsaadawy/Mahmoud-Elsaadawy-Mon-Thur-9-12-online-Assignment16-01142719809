import { type Request, Response } from "express";
import User from "../../DB/models/user/user.model";
import {
  ConflictException,
  BadRequestException,
  UnauthorizedException,
} from "../../utils/error.exceptions";
import { successResponse } from "../../utils/success.response";
import { ProviderEnum } from "../../DB/models/user/user.types";
import { compare } from "../../utils/security/hashing";
import { signUpData } from "./auth.validation";

class AuthService {
  async signup(data: signUpData) {
    const { name, email, password, phone, age, gender, role, bio } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      throw new ConflictException("User Already Exists");
    }

    const userCreated = await User.create({
      name,
      email,
      password,
      phone,
      age,
      gender,
      role,
      bio,
    });

    successResponse({
      res,
      message: "User Created Successfully",
      data: userCreated,
    });
  }
}
export const signupService = async (req: Request, res: Response) => {

  
};

export const loginService = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthorizedException("Invalid email or password");
  }

  if (user.provider > ProviderEnum.system) {
    throw new BadRequestException("use social login");
  }

  const matchedPassword = await compare(password, user.password);

  if (!matchedPassword) {
    throw new UnauthorizedException("Invalid email or password");
  }

  const userObj = user.toObject();
  const {
    _id,
    __v,
    isOnline,
    isActive,
    password: _password,
    createdAt,
    updatedAt,
    ...safeUserData
  } = userObj;

  successResponse({
    res,
    message: "logged in successfully",
    data: safeUserData,
  });
};
