import TeacherModel from "../models/teacher.model.js";
import TeacheridModel from "../models/teacherid.model.js";
import { consumer, producer } from "../kafka/kafka-client.js";
import { json } from "express";
import mongoose from "mongoose";

// <=====================ADD TEACHER =========================>

export const addteacher = async (req, res) => {
  try {
    const { name, email, contact, subject } = req.body;
    const { id } = req.user;

    // Validate required fields
    if (!name || !email || !contact || !subject) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Find admin user
    // const adminuser = await AuthModel.findById(id);
    // if (!adminuser) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Admin user not found",
    //   });
    // }

    // Generate unique teacher ID
    function generateTeacherId() {
      return Math.floor(10000000 + Math.random() * 90000000); // 8 digits
    }

    let generatedid;
    let exists = true;

    while (exists) {
      generatedid = generateTeacherId();
      exists = await TeacheridModel.findOne({ teacherid: generatedid });
    }

    // Create teacher
    const newteacher = await TeacherModel.create({
      name,
      email,
      contact,
      subject,
      teacherid: generatedid,
      admin: [id], // directly link
    });

    // Store teacherid separately
    await TeacheridModel.create({ teacherid: generatedid });

    // Update admin → teacher relation
    await producer.send({
      topic: "teacher-event",
      messages: [
        {
          value: JSON.stringify({
            type: "TEACHER ADDED",
            payload: newteacher,
            id: id,
          }),
        },
      ],
    });

    return res.json({
      message: "Teacher added successfully",
      success: true,
      teacher: newteacher,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// <=====================DELETE TEACHER =========================>

export const deleteteacher = async (req, res) => {
  try {
    const teacherId = req.params.id;

    // Find teacher first
    const teacher = await TeacherModel.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    // Remove teacher from TeacheridModel
    await TeacheridModel.findOneAndDelete({ teacherid: teacher.teacherid });

    // Delete teacher
    await TeacherModel.findByIdAndDelete(teacherId);
    await producer.send({
      topic: "teacher-event",
      messages: [
        {
          value: JSON.stringify({
            type: "TEACHER DELETE",
            payload: teacherId,
          }),
        },
      ],
    });
    return res.json({
      success: true,
      message: "Teacher deleted successfully",
    });
  } catch (error) {
    res.json({
      message: "something went wrong",
      success: false,
    });
  }
};

// <=====================SHOW TEACHER =========================>

export const showteacher = async (req, res) => {
  try {
    const { id } = req.user;
    const teacher = await TeacherModel.find({
      admin: new mongoose.Types.ObjectId(id),
    });

    res.json({
      sucess: true,
      message: "teacher found",
      teacher,
    });
  } catch (error) {
    res.json({
      sucess: false,
      message: "something went wrong",
    });
  }
};

// <=====================GET TEACHER =========================>

export const getteacher = async (req, res) => {
  try {
    let teacher = await TeacherModel.findOne({ teacherid: req.params.id });
    if (!teacher) {
      res.json({
        success: false,
        message: "user is not authenticated",
      });
    }
    res.json({
      success: true,
      message: "teacher found",
      teacher: teacher,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "something went wrong",
    });
  }
};

// <=====================UPDATE TEACHER =========================>

export const updateteacher = async (req, res) => {
  try {
    const teacher = await TeacherModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!teacher) {
      res.json({
        success: false,
        message: "teacher not updated",
      });
    }

    res.json({
      message: "teacher Updated",
      success: true,
    });
  } catch (error) {
    res.json({
      message: "something went wrong",
      success: false,
    });
  }
};

// <=====================ASSIGN TEACHER =========================>

export const assignclass = async (req, res) => {
  try {
    const id = req.params.id;
    const teacher = await TeacherModel.findById(id);
    teacher.assignclass = req.body.assignclass;
    await teacher.save();
    res.json({
      success: true,
      message: "Assigned Class",
    });
  } catch (err) {
    res.json({
      success: false,
      message: "something went wrong",
    });
  }
};

// <=====================ASSIGN SUBJECT TEACHER =========================>

export const assignsubject = async (req, res) => {
  try {
    const id = req.params.id;
    const teacher = await TeacherModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({ success: true, message: "subject assigned" });
  } catch (err) {
    res.json({
      success: false,
      message: "something went wrong",
    });
  }
};
export default {
  addteacher,
  showteacher,
  getteacher,
  updateteacher,
  deleteteacher,
  assignclass,
  assignsubject,
};
