import Mark from "../models/grade.model.js";

export const addgrade = async (req, res) => {
  try {
    const { studentId, grades, examName } = req.body;
    const teacherId = req.user.id;
    if (!studentId || !teacherId || !grades || !examName) {
      return res.status(400).json({
        success: false,
        message: "All field are required",
      });
    }
    const isuser = await Mark.findOne({ studentId, examName });
    if (!(isuser === null)) {
      return res.status(400).json({
        success: false,
        message: "Grades for this student already exist",
        success: false,
      });
    }
    const marks = grades.map((g) => ({
      subject: g.subject.trim(),
      mark: Number(g.mark),
    }));
    const grade = await Mark.create({
      studentId,
      teacherId,
      examName,
      marks: marks,
    });

    res.status(200).json({
      success: true,
      message: "Grade Added Successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const getgrade = async (req, res) => {
  try {
    const { studentId, examName } = req.body;
    if (!studentId || !examName) {
      return res.json({
        success: false,
        message: "All field required",
      });
    }
    const grade = await Mark.findOne({
      studentId,
      examName,
    });
    console.log(grade);
    if (grade === null) {
      return res.json({
        message: "no grade found",
        success: false,
      });
    }
    res.json({
      message: "grade found",
      grade,
    });
  } catch (error) {
    res
      .status(500)
      .json({ errors: true, success: false, message: "internal server error" });
  }
};

export const updateGrade = async (req, res) => {
  try {
    const { studentId, examName, marks } = req.body;
    const teacherId = req.user.id;
    if (!studentId || !examName || !marks) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const grade = await Mark.findOne({ studentId, examName });
    if (!grade) {
      return res.status(400).json({
        success: false,
        message: "No grade found for this student and exam",
      });
    }
    const updatedMarks = marks.map((g) => ({
      subject: g.subject.trim(),
      mark: Number(g.mark),
    }));
    grade.marks = updatedMarks;
    await grade.save();
    res.status(200).json({
      success: true,
      message: "Grade updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const deleteGrade = async (req, res) => {
  try {
    const { studentId, examName } = req.body;
    const teacherId = req.user.id;
    if (!studentId || !examName) {
      return res.status(400).json({
        success: false,
        message: "Student ID and Exam Name are required",
      });
    }
    const grade = await Mark.findOneAndDelete({
      studentId,
      examName,
      teacherId, // Optional: ensure teacher owns it
    });
    if (!grade) {
      return res.status(400).json({
        success: false,
        message: "No grade found for this student and exam",
      });
    }
    res.status(200).json({
      success: true,
      message: "Grade deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};
