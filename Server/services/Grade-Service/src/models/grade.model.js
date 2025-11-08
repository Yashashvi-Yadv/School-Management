import mongoose from "mongoose";

const markSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    examName: {
      type: String,
      required: true,
    },
    marks: [
      {
        subject: {
          type: String,
          required: true,
          trim: true,
        },
        mark: {
          type: Number,
          required: true,
          min: 0,
          max: 100,
        },
      },
    ],
  },
  { timestamps: true }
);

const Mark = mongoose.model("grade", markSchema);

export default Mark;
