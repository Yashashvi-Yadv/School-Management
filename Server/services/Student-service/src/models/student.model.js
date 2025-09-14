import mongoose from "mongoose";

const studentschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  className: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
  },
  rollNo: {
    type: Number,
  },
  section: {
    type: String,
  },
  subject: [
    {
      type: String,
    },
  ],
  teacher: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "teacher",
    },
  ],
});

export default mongoose.model("student", studentschema);
