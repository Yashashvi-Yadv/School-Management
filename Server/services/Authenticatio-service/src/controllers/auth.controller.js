import { auth, OAuth2Client } from "google-auth-library";
import usermodel from "../models/auth.model.js";
import TeacherModel from "../models/teacher.model.js";
import jwt from "jsonwebtoken";

import { consumer } from "../kafka/kafka-client.js";
const client = new OAuth2Client(process.env.clientid);

// ✅ Helper to create JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET || "mysecret",
    { expiresIn: "7d" }
  );
};

// ================= Signup ==================
export const signup = async (req, res) => {
  try {
    const { token } = req.body;

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.clientid,
    });

    const payload = ticket.getPayload();
    const { sub, email, name, picture } = payload;

    // Check if user already exists
    let isuser = await usermodel.findOne({ googleId: sub });

    if (isuser) {
      return res.json({
        success: false,
        message: "User already exists, please login",
      });
    }

    // Create new user
    isuser = await usermodel.create({
      googleId: sub,
      email,
      name, // ✅ user’s actual name
      picture, // ✅ profile picture URL
      role: "admin",
    });

    // Generate JWT
    const apptoken = generateToken(isuser);
    res.json({
      message: "Signup successful",
      success: true,
      user: isuser,
      role: isuser.role,
      jwt: apptoken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Signup failed",
      success: false,
    });
  }
};

// ================= Login ==================
export const login = async (req, res) => {
  try {
    const { token } = req.body;

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.clientid,
    });

    const payload = ticket.getPayload();
    const { sub } = payload;

    // Check if user exists
    const isuser = await usermodel.findOne({ googleId: sub });

    if (!isuser) {
      return res.json({
        success: false,
        message: "No account found, please signup",
      });
    }

    // Generate JWT
    const apptoken = generateToken(isuser);

    res.json({
      message: "Login successful",
      success: true,
      user: isuser,
      role: isuser.role,
      jwt: apptoken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Login failed",
      success: false,
    });
  }
};

// ================= Test Route ==================
export const test = (req, res) => {
  res.send("route is working");
};

// ================= Teacher Login ==================
export const teacherlogin = async (req, res) => {
  try {
    const { id, password } = req.body;
    const teacher = await TeacherModel.findOne({ teacherid: id });

    if (!teacher) {
      return res.json({
        success: false,
        message: "No account found",
      });
    }

    if (teacher.contact !== Number(password)) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const token = generateToken(teacher);

    return res.json({
      success: true,
      message: "Login successful",
      teacher,
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// ================= Student Login (to be implemented) ==================
export const studentlogin = async (req, res) => {
  res.json({
    success: false,
    message: "Student login not implemented yet",
  });
};
