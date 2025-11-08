import e from "express";
import Notification from "../models/notification.model.js";
export const SaveNotification = async (req, res) => {
  try {
    const { title, message, type, recipientType, recipientId } = req.body;
    const { id } = req.user;
    if (!title || !message || !type) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }
    const notification = await Notification.create({
      title,
      message,
      type,
      senderid: id,
      senderRole: "teacher",
      recipientRole: recipientType,
      recipientId: recipientId || null,
    });

    return res.json({
      success: true,
      message: "Notification sent successfully",
    });
  } catch (error) {
    return res.json({
      success: "error",
      error: error,
      message: "internal server error",
    });
  }
};

export const teachernotify = async (req, res) => {
  try {
  } catch (error) {
    return res.json({
      success: "error",
      error: error,
      message: "internal server error",
    });
  }
};
export const deletenotification = async (req, res) => {
  try {
    const { id } = req.user; // Assume auth middleware sets req.user.id (sender ID)
    const notificationId = req.params.id;

    if (!notificationId) {
      return res.status(400).json({
        success: false,
        message: "Notification ID is required",
      });
    }

    if (!id) {
      return res.status(401).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Find and delete only if owned by user
    const delnot = await Notification.findOneAndDelete({
      _id: notificationId,
      senderid: id, // Ensure only sender can delete
    });

    if (delnot) {
      return res.json({
        success: true,
        message: "Notification deleted successfully",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Notification not found or access denied",
      });
    }
  } catch (error) {
    console.error("Error deleting notification:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message, // Send only message for security
    });
  }
};
export const getnotify = async (req, res) => {
  try {
    const { id } = req.user;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const notifications = await Notification.find({
      senderid: id,
    });

    return res.json({
      message:
        notifications.length > 0
          ? "Notifications found"
          : "No notifications found",
      success: true,
      notifications, // Renamed for clarity; use 'notifications' consistently
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message, // Send only message for security
    });
  }
};
