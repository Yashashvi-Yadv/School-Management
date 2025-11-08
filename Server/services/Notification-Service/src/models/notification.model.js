import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ["info", "warning", "success"], default: "info" },
  senderid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teacher",
    required: true,
  },
  senderRole: { type: String, enum: ["teacher", "principal"] },
  recipientRole: { type: String, enum: ["student", "all"] },
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "recipientRole",
    default: null,
  },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("notification", notificationSchema);
