import mongoose from "@provider/database";

import { ReportDocument } from "@interfaces/model/report";

const ReportSchema = new mongoose.Schema<ReportDocument>(
  {
    smallHolderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Smallholder",
      validate: {
        validator(v: any) {
          return mongoose.Types.ObjectId.isValid(v);
        },
        message: (props) => `${props.value} is not a valid ObjectId!`,
      },
    },
    productId: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Product",
      required: true,
    },
    quantity: {
      type: mongoose.Schema.Types.Number,
      required: true,
      default: 0,
    },
    dateReport: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true, collection: "Report" }
);

const ReportModel = mongoose.model<ReportDocument>("Report", ReportSchema);
export default ReportModel;
