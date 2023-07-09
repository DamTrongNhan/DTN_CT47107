import mongoose from "@provider/database";
import WorkersDocument from "@interfaces/model/workers";

const WorkersScheme = new mongoose.Schema<WorkersDocument>(
  {
    smallHolderId: { type: mongoose.Schema.Types.ObjectId, ref: "SmallHolder" },
    fullName: { type: String },
    age: { type: String },
    exp: { type: String },
    gender: { type: String },
    phone: { type: String },
    avatar: { type: String },
  },
  { timestamps: true, collection: "Workers" }
);

const WorkersModel = mongoose.model("Workers", WorkersScheme);
export default WorkersModel;
