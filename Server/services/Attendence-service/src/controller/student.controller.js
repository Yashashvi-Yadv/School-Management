import Attendance from "../models/attendence.model.js"; // Use corrected model path

// Fetch attendance for logged-in student
export const getAttendanceForStudent = async (req, res) => {
  try {
    const { date, startDate, endDate, teacherid } = req.body;
    const studentId = req.user.id; // Assuming req.user contains authenticated user info
    console.log(date, studentId, startDate, endDate);
    let records = [];

    if (startDate && endDate) {
      // Case 1: Range search
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      records = await Attendance.find({
        studentId,
        date: { $gte: start, $lte: end },
      }).sort({ date: 1 });
    } else if (date) {
      // Case 2: Single day search
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      records = await Attendance.find({
        studentId,
        date: { $gte: start, $lte: end },
      });
      console.log(records);
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
    console.error("❌ Error fetching attendance:", error);
    res.status(500).json({
      message: "Server error while fetching attendance",
      error: error.message,
      success: false,
    });
  }
};
