import mongoose from "mongoose";

export type ProductDocument = mongoose.Document & {
  smallHolderId: mongoose.Schema.Types.ObjectId;
  name: string;
  materials: string;
  price: number;
  type: string;
  avatar: string;
  photos: string[];
  description: string;
  qrCode: string;
};
export default ProductDocument;
