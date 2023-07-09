import mongoose from "@provider/database";
import SmallHolderDocument from "@interfaces/model/smallHolder";

// Define the model
const SmallHolderSchema = new mongoose.Schema<SmallHolderDocument>(
  {
    villageId: { type: mongoose.Schema.Types.ObjectId, ref: "Village" },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    productId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    workersId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Workers" }],
    name: { type: String },
    address: { type: String },
    group: { type: String },
    city: { type: String },
    ward: { type: String },
    district: { type: String },
    majorWork: { type: String },
    materials: [{ type: String }],
    quantityWorkers: { type: String },
    qrCode: { type: String },
    description: { type: String },
    exp: { type: String },
    quantityProduct: { type: String },
    avatar: { type: String },
    photos: [{ type: String }],
  },
  { timestamps: true, collection: "SmallHolder" }
);

// Export the model
const SmallHolderModel = mongoose.model<SmallHolderDocument>(
  "SmallHolder",
  SmallHolderSchema
);
export default SmallHolderModel;
