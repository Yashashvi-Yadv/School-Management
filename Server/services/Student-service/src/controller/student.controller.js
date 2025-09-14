//<=========== Imports =============>
import { producer, consumer } from "../kafka/kafka-client.js";
import studentmodel from "../models/student.model.js";

//<================= Add Student ====================>
export const add = async (req, res) => {
  try {
    const { name, rollNo, contact, section, className, email } = req.body;
    const { id } = req.user; // Teacher’s id from auth middleware

    // Check if student already exists with same email + rollNo
    const isStudent = await studentmodel.findOne({ email, rollNo });
    if (isStudent) {
      return res.json({
        success: false,
        message: "Student with same email and roll number already exists",
      });
    }

    // Create new student
    const student = await studentmodel.create({
      name,
      email,
      rollNo,
      contact,
      section,
      className,
      teacher: id,
    });

    // Produce event to Kafka (link student to teacher)
    await producer.send({
      topic: "teacher-event",
      messages: [
        {
          value: JSON.stringify({
            type: "student added",
            payload: student._id, // Just ID if teacher schema has ObjectId[]
            id: id, // The teacher who owns this student
          }),
        },
      ],
    });

    res.json({
      success: true,
      message: "Student saved successfully",
      data: student,
    });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//<================= Update Student ====================>
export const update = async (req, res) => {
  try {
    const { name, email, rollNo, className, contact, section, subject } =
      req.body;
    const user = await studentmodel.findByIdAndUpdate(
      req.body.studentId,
      { name, email, rollNo, className, contact, section, subject },
      { new: true }
    );
    if (!user) {
      return res.json({
        success: false,
        message: "no student found",
      });
    }
    res.json({
      message: "student updated",
      success: true,
    });
  } catch (err) {
    res.json({
      success: false,
      message: "internal server error",
    });
  }
  console.log("helo from add function");
};

//<================= Delete Student ====================>
export const remove = async (req, res) => {
  try {
    const { id } = req.user;
    const { studentId } = req.body;
    const user = await studentmodel.findByIdAndDelete(studentId);
    if (!user) {
      return res.json({
        success: false,
        message: "user not found",
      });
    }
    await producer.send({
      topic: "teacher-event",
      messages: [
        {
          value: JSON.stringify({
            type: "student deleted",
            payload: studentId, //
            id: id, //
          }),
        },
      ],
    });

    res.json({
      success: true,
      message: "student deleted",
    });
  } catch (err) {
    res.json({
      success: false,
      message: "internal server error",
    });
  }
};

//<================= Show Student ====================>
export const show = async (req, res) => {
  try {
    const { id } = req.user;
    const student = await studentmodel.find({ teacher: id });
    if (!student) return;
    return res.json({
      success: true,
      student: student,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "internal server error",
    });
  }
};

//<================= Get Student ====================>
export const get = async (req, res) => {
  try {
    const { id } = req.user;
    const { rollNo } = req.body;
    const user = await studentmodel.findOne({ teacher: id, rollNo: rollNo });
    if (!user) {
      return res.json({
        success: false,
        message: "student not found",
      });
    }
    res.json({
      success: true,
      message: "student found",
      student: user,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getforattendence = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await studentmodel.find({ teacher: id });
    if (!user) {
      return res.json({
        success: false,
        message: "user not foud",
      });
    }
    console.log(user);

    res.json({
      message: "user found",
      success: true,
      student: user,
    });
  } catch (error) {
    res.json({
      message: "internal server error",
      success: false,
    });
  }
};

export default { add, update, remove, get, getforattendence };
