import mongoose from "mongoose";

// JobApplication schema
const jobApplicationSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  userId: { type: String, ref: 'User', required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' },
  resume: { type: String }, // ✅ add this
});


// Create model
const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);

// ✅ Export default so you can do `import JobApplication from "../models/JobApplications.js"`
export default JobApplication;
