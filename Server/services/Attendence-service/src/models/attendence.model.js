// models/attendence.model.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const studentAttendanceSchema = new Schema({
  teacherId: { type: Schema.Types.ObjectId, ref: "teacher", required: true },
  studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ["present", "absent", "late"], required: true },
});

studentAttendanceSchema.index({ studentId: 1, date: 1 }, { unique: true });

const Attendence = mongoose.model("attendences", studentAttendanceSchema);
export default Attendence;
