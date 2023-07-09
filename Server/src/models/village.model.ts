import mongoose from "@provider/database";
import VillageDocument from "@interfaces/model/village";

// Define the model
const VillageSchema = new mongoose.Schema<VillageDocument>(
  {
    smallHolderId: [
      { type: mongoose.Schema.Types.ObjectId, ref: "SmallHolder" },
    ],
    adminId: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    name: { type: String },
    address: { type: String },
    majorWork: { type: String },
    quantitySmallHolder: { type: String },
    materials: [{ type: String }],
    avatar: { type: String },
    photos: [{ type: String }],
    description: { type: String },
    group: { type: String },
  },
  { timestamps: true, collection: "Village" }
);

// Export the model
const VillageModel = mongoose.model<VillageDocument>("Village", VillageSchema);
export default VillageModel;
