import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // Clerk ID
  name: { type: String, required: true },
  email: { type: String, required: false, unique: true, sparse: true }, // 👈 not required, allow null
  resume: { type: String },
  image: { type: String, required: true },
});

// Prevent OverwriteModelError in dev/hot reload
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
