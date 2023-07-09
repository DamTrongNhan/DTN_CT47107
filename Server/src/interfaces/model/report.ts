import mongoose from "mongoose";

export type ReportDocument = mongoose.Document & {
  smallHolderId: mongoose.Schema.Types.ObjectId;
  productId: mongoose.Schema.Types.ObjectId[];
  quantity: number;
  dateReport: Date;
};
