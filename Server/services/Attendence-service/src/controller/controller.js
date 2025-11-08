// controllers/attendence.controller.js
import Attendence from "../models/attendence.model.js";

//<==========================================================>
//<================= Take Attendance ========================>
export const takeAttendence = async (req, res) => {
  try {
    const teacherId = req.user.id;
    let { date, attendance } = req.body; // attendance = [{ studentId, status }, ...]

    const attendanceDate = new Date(date);

    // Check for duplicates: fetch all records for these students on the same date
    const studentIds = attendance.map((a) => a.studentId);
    const existingRecords = await Attendence.find({
      studentId: { $in: studentIds },
      date: attendanceDate,
    }).select("studentId");

    const existingStudentIds = existingRecords.map((r) =>
      r.studentId.toString()
    ); // check for existing student IDs

    // Filter out students who already have attendance for that day
    const newDocs = attendance
      .filter((a) => !existingStudentIds.includes(a.studentId))
      .map((a) => ({
        teacherId,
        studentId: a.studentId,
        status: a.status,
        date: attendanceDate,
      })); // filter student who do not have attendance for that day and also mark the attendance for that day

    if (newDocs.length === 0) {
      return res.status(400).json({
        message:
          "Attendance for all selected students is already recorded for this date",
        success: false,
      });
    }

    await Attendence.insertMany(newDocs);

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
    const { date, studentId, startDate, endDate } = req.body;

    let records = [];

    if (startDate && endDate) {
      // Case 1: Range search
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      records = await Attendence.find({
        studentId,
        date: { $gte: start, $lte: end },
      }).sort({ date: 1 });
    } else if (date) {
      // Case 2: Single day search
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);

      records = await Attendence.find({
        studentId,
        date: { $gte: start, $lte: end },
      });
    } else {
      return res.status(400).json({
        message: "Please provide either a date or a startDate and endDate",
        success: false,
      });
    }

    // ✅ If no records found → return clean response
    if (!records || records.length === 0) {
      return res.json({
        message: "No attendance found for given criteria",
        success: false,
      });
    }

    // ✅ If found → send records
    res.status(200).json({
      message: "Attendance fetched successfully",
      attendance: records.map((r) => ({
        student: r.studentId,
        status: r.status,
        date: r.date,
        teacherId: r.teacherId,
      })),
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

//<=================Update Student =======================>

export const updateAttendance = async (req, res) => {
  try {
    const { studentId, date, status } = req.body;

    if (!studentId || !date || !status) {
      return res.status(400).json({
        message: "StudentId, date and status are required",
        success: false,
      });
    }

    // Normalize date (search only that day, ignore time part)
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const record = await Attendence.findOneAndUpdate(
      { studentId, date: { $gte: start, $lte: end } },
      { status }, // update only status
      { new: true } // return updated doc
    );

    if (!record) {
      return res.status(404).json({
        message: "No attendance record found to update",
        success: false,
      });
    }

    res.status(200).json({
      message: "Attendance updated successfully",
      attendance: record,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating attendance",
      error: error.message,
      success: false,
    });
  }
};

export const deleteattendence = async (req, res) => {
  try {
    const { studentId, date } = req.body;

    if (!studentId || !date) {
      return res.status(400).json({
        message: "studentId and date are required",
        success: false,
      });
    }

    // Normalize date (00:00 to 23:59 of given date)
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const record = await Attendence.findOneAndDelete({
      studentId,
      date: { $gte: start, $lte: end },
    });

    if (!record) {
      return res.status(404).json({
        message: "No attendance record found for this student on this date",
        success: false,
      });
    }

    res.status(200).json({
      message: "Attendance deleted successfully",
      deletedRecord: record,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting attendance",
      error: error.message,
      success: false,
    });
  }
};

export default {
  takeAttendence,
  getAttendence,
  updateAttendance,
  deleteattendence,
};
