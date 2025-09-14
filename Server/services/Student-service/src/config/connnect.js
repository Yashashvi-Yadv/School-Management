import mongoose from "mongoose";
async function db() {
  try {
    console.log("connecting");
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/school_management",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // Exit if connection fails
  }
}

export default db;
