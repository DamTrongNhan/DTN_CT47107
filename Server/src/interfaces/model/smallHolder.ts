import mongoose from "mongoose";

export type SmallHolderDocument = mongoose.Document & {
  villageId: mongoose.Schema.Types.ObjectId;
  adminId: mongoose.Schema.Types.ObjectId;
  productId: mongoose.Schema.Types.ObjectId[];
  workersId: mongoose.Schema.Types.ObjectId[];
  name: string;
  address: string;
  group: string;
  city: string;
  ward: string;
  district: string;
  majorWork: string;
  materials: string[];
  qrCode: string;
  description: string;
  exp: string;
  quantityProduct: string;
  quantityWorkers: string;
  avatar: string;
  photos: string[];
};

export default SmallHolderDocument;
