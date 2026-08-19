import { nanoid } from "nanoid";
import { Tokens } from "../../middleware/auth.middleware";
import { generateOtpHtml } from "../../utils/email/confirm.template";
import { generateOtp } from "../../utils/email/generateOtp";
import { sendEmail } from "../../utils/email/sendEmail";
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from "../../utils/error.exceptions";
import {
  generateOtpKey,
  jwtIdKey,
  redisDel,
  redisGet,
  redisSet,
  redisTTL
} from "../../utils/redis/redis.service";
import { compare } from "../../utils/security/hashing";
import { generateToken } from "../../utils/security/token";
import User from "../user/models/user.model";
import { ProviderEnum } from "../user/types/user.types";
import {
  confirmEmailData,
  loginData,
  resendOtpData,
  signUpData,
} from "./auth.validation";

export class AuthServices {
  async signup(data: signUpData) {
    const { name, email, password, phone, age, gender, role, bio } = data;
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
      bio: bio ? bio : "",
    });

    return userCreated;
  }

  async confirmEmail(data: confirmEmailData) {
    const { email, otp } = data;
    const user = await User.findOne({
      email,
      confirmedAt: {
        $exists: false,
      },
    });

    if (!user) {
      throw new BadRequestException("User not found");
    }

    const userOtp = await redisGet(generateOtpKey(user.id));
    if (!userOtp) {
      throw new BadRequestException("Otp expired");
    }

    if (userOtp != otp) {
      throw new BadRequestException("Invalid Otp");
    }

    user.confirmedAt = new Date();
    await redisDel(generateOtpKey(user.id));
    await user.save();

    return { data: {} };
  }

  async login(data: loginData) {
    const { email, password } = data;

    const user = await User.findOne({ email });

    if (!user) {
      throw new UnauthorizedException("Invalid email or password");
    }

    if (user.provider > ProviderEnum.system) {
      throw new BadRequestException("Use social login");
    }

    const matchedPassword = await compare(password, user.password);

    if (!matchedPassword) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const jwtAccess = process.env.ACCESS_JWT;
    const jwtidAccess = nanoid(20);
    const jwtRefresh = process.env.REFRESH_JWT;
    const jwtidRefresh = nanoid(20);

    if (jwtAccess && jwtRefresh) {
      const accessToken = generateToken(
        {
          id: user.id,
        },
        jwtAccess,
        {
          expiresIn: "30M",
          jwtid: jwtidAccess,
        },
      );

      const refreshToken = generateToken(
        {
          id: user.id,
        },
        jwtRefresh,
        {
          expiresIn: "7D",
          jwtid: jwtidRefresh,
        },
      );
      redisSet(jwtIdKey(user.id, Tokens.access), jwtidAccess, 30);
      redisSet(jwtIdKey(user.id, Tokens.refresh), jwtidRefresh, 7 * 60 * 24);
      return {
        accessToken,
        refreshToken,
      };
    }
  }

  async resendOtp(data: resendOtpData) {
    const email = data.email
    const user = await User.findOne({ email });
    if (!user) {
      throw new NotFoundException("User Already Exists");
    }
    if (user.confirmedAt) {
      throw new BadRequestException("Email already confirmed");
    }

    const oldOtp = await redisGet(generateOtpKey(user.id));
    if (oldOtp) {
      const ttl = await redisTTL(generateOtpKey(user.id));
      throw new BadRequestException(
        `Wait for ${Math.ceil(ttl / 60)} minute(s) to resend the otp`,
      );
    }

    const otp = generateOtp();
    sendEmail({
      to: email,
      subject: "Confirm your email",
      html: generateOtpHtml(user.name, otp),
    });

    redisSet(generateOtpKey(user.id), otp, 5);
    return { data: {} };
  }
}

export default new AuthServices();
