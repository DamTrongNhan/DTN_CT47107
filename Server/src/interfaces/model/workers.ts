import mongoose from "mongoose";

export type WorkersDocument = mongoose.Document & {
  smallHolderId: mongoose.Schema.Types.ObjectId;
  fullName: string;
  age: string;
  exp: string;
  gender: string;
  phone: string;
  avatar: string;
};
export default WorkersDocument;
