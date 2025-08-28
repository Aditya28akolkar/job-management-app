import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

import connectDB from './config/db.js';
import connectCloudinary from './config/cloudinary.js';
import companyRoutes from './routes/companyRoutes.js';
import { clerkWebhooks } from './controllers/webhooks.js';

const app = express();

// ✅ Initialize Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN,   // put your real DSN here
  integrations: [
    nodeProfilingIntegration(),
  ],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});

// ✅ Connect DB + Cloudinary
await connectDB();
await connectCloudinary();

// ✅ Middlewares
app.use(cors());

// ✅ Routes
app.use("/api/company", companyRoutes);

app.get("/", (req, res) => res.send("✅ API working"));

app.get("/debug-sentry", (req, res) => {
  throw new Error("My first sentry error");
});

// ✅ Clerk webhook route with raw body
app.post(
  "/webhooks",
  express.raw({ type: "application/json" }),
  clerkWebhooks
);
app.use(express.json());


const PORT = process.env.PORT || 5000;

// ✅ Error handler middleware for Sentry (v8 style)
app.use(Sentry.expressErrorHandler());

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
