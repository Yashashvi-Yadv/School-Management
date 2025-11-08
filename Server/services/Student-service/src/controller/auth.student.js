import studentModel from "../models/student.model.js";
import jsonwebtoken from "jsonwebtoken";

export const StudentLogin = async (req, res) => {
  try {
    const user = await studentModel.findOne({
      contact: req.body.id,
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }
    if (user.password !== Number(req.body.password)) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        name: user.name,
        contact: user.contact,
        rollNo: user.rollNo,
        className: user.className,
        teacherid: user.teacher[0],
      },
      token: jsonwebtoken.sign(
        {
          id: user._id,
          role: "student",
        },
        process.env.JWT || "mysecret",
        { expiresIn: "1d" }
      ),
    });
  } catch (error) {
    res.status(500).json({
      success: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
