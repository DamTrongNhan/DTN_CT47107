import mongoose from "mongoose";

export type comparePasswordFunction = (
  candidatePassword: string,
  cb: (err: any, isMatch: any) => void
) => void;

export type UserDocument = mongoose.Document & {
  villageId: mongoose.Schema.Types.ObjectId;
  smallHolderId: mongoose.Schema.Types.ObjectId;
  email: string;
  password: string;
  fullName: string;
  phone: string;
  avatar: string;
  isAdmin: boolean;
  isAdminWebsite: boolean;
  isAdminSmallHolder: boolean;
  refreshToken: string;
  comparePassword: comparePasswordFunction;
};
export default UserDocument;
