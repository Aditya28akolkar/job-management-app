import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

import connectDB from './config/db.js';
import connectCloudinary from './config/cloudinary.js';
import companyRoutes from './routes/companyRoutes.js';
import { clerkWebhooks } from './controllers/webhooks.js';
import jobRoutes from './routes/jobRoutes.js'
import userRoutes from "./routes/userRoutes.js"
import {clerkMiddleware} from '@clerk/express'
const app = express();

// ✅ Initialize Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [nodeProfilingIntegration()],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});

// ✅ Connect DB + Cloudinary
await connectDB();
await connectCloudinary();

// ✅ Middlewares
app.use(cors());
app.use(clerkMiddleware())

// ⚠️ Important: Add JSON parser ONLY for non-webhook routes
app.use((req, res, next) => {
  if (req.originalUrl === "/webhooks") {
    next(); // Skip JSON parser for Clerk webhooks
  } else {
    express.json()(req, res, next);
  }
});

// ✅ Routes


app.get("/", (req, res) => res.send("✅ API working"));

app.get("/debug-sentry", (req, res) => {
  throw new Error("My first sentry error");
});

// ✅ Clerk webhook route with raw body
app.post(
  "/webhooks/clerk",
  express.raw({ type: "application/json" }),
  clerkWebhooks
);
app.use("/api/company", companyRoutes);
app.use('/api/jobs',jobRoutes)
app.use('/api/users',userRoutes)
const PORT = process.env.PORT || 5000;

// ✅ Error handler middleware for Sentry
app.use(Sentry.expressErrorHandler());

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
