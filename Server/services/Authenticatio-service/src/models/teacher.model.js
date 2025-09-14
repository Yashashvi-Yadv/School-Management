import mongoose from "mongoose";
const teacherschema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    contact: { type: Number, required: true },
    subject: [{ type: String }],
    teacherid: { type: Number, required: true },
    role: {
      type: String,
      enum: ["student", "teacher", "principal", "admin", "user"],
      default: "teacher",
    },
    assignclass: { type: String, default: "" },
    admin: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],

     students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "student",
      },
    ],
  },
  { timestamps: true }
);

export default  mongoose.model("teacher", teacherschema);
