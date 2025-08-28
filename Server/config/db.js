import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => console.log("✅ Database connected"));

  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: "job_portal", // ✅ use underscore, no dash or dot
  });
};

export default connectDB;
