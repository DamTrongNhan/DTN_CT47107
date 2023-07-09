import { INotifications } from "@interfaces/model/notifications";
import mongoose from "@provider/database";

export { INotifications as INotificationsModel };
const NotificationsSchema = new mongoose.Schema<INotifications>(
  {
    sender: {
      type: String,
      required: [true, "Sender is missing, ???Who send this message???"],
    },
    receivers: {
      type: [String],
      required: [true, "Receiver is missing ???Send this message to whom???"],
    },
    header: {
      type: String,
      required: [true, "Send message without header???"],
    },
    body: {
      type: String,
    },
    read: {
      type: Boolean,
    },
  },
  { timestamps: true, collection: "Notifications" }
);

// NotificationsSchema.pre("save", function (next) {
//   // Here for encrypt Messages and titles
// });

// Export the model
export default mongoose.model<INotifications>(
  "Notifications",
  NotificationsSchema
);
