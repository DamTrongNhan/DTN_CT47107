import mongoose from "../provider/database";
import UserDocument, { comparePasswordFunction } from "@interfaces/model/user";
import bcrypt from "bcrypt";

// Define the model
const UserSchema = new mongoose.Schema<UserDocument>(
  {
    villageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Village",
    },
    smallHolderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SmallHolder",
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      validate: {
        validator(v: string) {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
        },
        message: (props: { value: any }) =>
          `${props.value} is not a valid email address!`,
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    phone: {
      type: String,
      unique: true,
      sparse: true,
      validate: {
        validator(v: string) {
          return /^[0-9]{10}$/.test(v);
        },
        message: (props: { value: any }) =>
          `${props.value} is not a valid phone number!`,
      },
    },
    avatar: { type: String },
    fullName: { type: String },
    isAdmin: { type: Boolean, default: false },
    isAdminWebsite: { type: Boolean, default: false },
    isAdminSmallHolder: { type: Boolean, default: false },
    refreshToken: { type: String },
  },
  { timestamps: true, collection: "User" }
);

UserSchema.pre("save", function save(next) {
  const user = this as UserDocument;

  if (!user.isModified("password")) return next();
  bcrypt.genSalt(10, (err: Error, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) {
        return next(hashError);
      }
      user.password = hash;
      next();
    });
  });
});

const comparePassword: comparePasswordFunction = function (
  candidatePassword,
  cb
) {
  bcrypt.compare(
    candidatePassword,
    this.password,
    (err: mongoose.Error, isMatch: boolean) => {
      cb(err, isMatch);
    }
  );
};

UserSchema.methods.comparePassword = comparePassword;

// Export the model
const UserModel = mongoose.model<UserDocument>("User", UserSchema);
export default UserModel;
