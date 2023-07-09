import mongoose from "mongoose";

export type VillageDocument = mongoose.Document & {
  name: string;
  address: string;
  majorWork: string;
  quantitySmallHolder: string;
  materials: string[];
  avatar: string;
  photos: string[];
  description: string;
  smallHolderId: mongoose.Schema.Types.ObjectId[];
  adminId: mongoose.Schema.Types.ObjectId[];
  group: string;
};

export default VillageDocument;
