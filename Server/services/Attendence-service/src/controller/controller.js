// controllers/attendence.controller.js
import Attendence from "../models/attendence.model.js";

//<==========================================================>
//<================= Take Attendance ========================>
export const takeAttendence = async (req, res) => {
  try {
    const teacherId = req.user.id;
    let { date, attendance } = req.body; // attendance = [{ studentId, status }, ...]

    // normalize date (strip time part)
    const normalizedDate = new Date(new Date(date).setHours(0, 0, 0, 0));
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    const record = await Attendence.findOne({
      date: { $gte: start, $lte: end },
    }); // get student details

    if (record) {
      return res
        .status(404)
        .json({ message: " Already taken for day", success: false });
    }
    // build documents for insert
    const docs = attendance.map((a) => ({
      teacherId,
      studentId: a.studentId,
      status: a.status,
      date: normalizedDate,
    }));

    // use bulkWrite to insert/update without duplicates
    const ops = docs.map((doc) => ({
      updateOne: {
        filter: { studentId: doc.studentId, date: doc.date },
        update: { $set: doc },
        upsert: true, // insert if not exists
      },
    }));

    await Attendence.bulkWrite(ops);

    res.status(201).json({
      message: "Attendance recorded successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error recording attendance",
      error: error.message,
      success: false,
    });
  }
};

//<===================== Get Attendance =====================>
export const getAttendence = async (req, res) => {
  try {
    const { date, studentId } = req.body;
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    const record = await Attendence.findOne({
      studentId,
      date: { $gte: start, $lte: end },
    }); // get student details

    if (!record) {
      return res
        .status(404)
        .json({ message: "No attendance found", success: false });
    }

    res.status(200).json({
      message: "Attendance fetched successfully",
      attendance: {
        student: record.studentId,
        status: record.status,
        date: record.date,
        teacherId: record.teacherId,
      },
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching attendance",
      error: error.message,
      success: false,
    });
  }
};

export default { takeAttendence, getAttendence };
