import mongoose from "mongoose";
import { IUser, GenderEnum, ProviderEnum, RoleEnum } from "../types/user.types";
import { hash } from "../../../utils/security/hashing";
import { encrypt, decrypt } from "../../../utils/security/encryption";
import { generateOtp } from "../../../utils/email/generateOtp";
import { sendEmail } from "../../../utils/email/sendEmail";
import { generateOtpHtml } from "../../../utils/email/confirm.template";
import { generateOtpKey, redisSet } from "../../../utils/redis/redis.service";

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      set: function (value: string) {
        return encrypt(value);
      },
      get: function (value: string) {
        return decrypt(value);
      },
    },
    age: {
      type: Number,
    },
    gender: {
      type: Number,
      enum: GenderEnum,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    confirmedAt: {
      type: Date,
    },
    changedCredentialsAt: {
      type: Date,
    },
    provider: {
      type: Number,
      enum: ProviderEnum,
      default: ProviderEnum.system,
    },
    role: {
      type: Number,
      enum: RoleEnum,
      default: RoleEnum.user,
    },
    profilePic: {
      type: String,
    },
    coverPics: {
      type: [String],
      default: [],
    },
    bio: {
      type: String,
    },
  },
  {
    timestamps: true,
    strictQuery: true,
    strict: true,
    optimisticConcurrency: true,
    toJSON: {
      getters: true,
    },
    toObject: {
      getters: true,
    },
  },
);

UserSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await hash(this.password);
  }
  if (this.isModified("email")) {
    const otp = generateOtp();
    sendEmail({
      to: this.email,
      subject: "Confirm your email",
      html: generateOtpHtml(this.name, otp),
    });
    redisSet(generateOtpKey(this.id), otp, 5);
  }
});

const userModel = mongoose.model("User", UserSchema);

export default userModel;
