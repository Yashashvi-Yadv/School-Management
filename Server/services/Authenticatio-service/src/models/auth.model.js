import mongoose from "mongoose";

const userschema = new mongoose.Schema(
  {
    googleId: { type: String, required: true, unique: true }, // from `sub`
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },

    // extra fields for flexibility
    role: {
      type: String,
      enum: ["student", "teacher", "principal", "admin", "user"],
      default: "admin",
    },
    teachers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "teacher",
      },
    ],
  },

  { timestamps: true }
);

const UserModel = mongoose.model("user", userschema);
export default UserModel;
