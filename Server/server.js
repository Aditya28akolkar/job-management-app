import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import * as Sentry from "@sentry/node";

import connectDB from './config/db.js';
import connectCloudinary from './config/cloudinary.js';
import './config/instrument.js';
import companyRoutes from './routes/companyRoutes.js';
import {clerkWebhooks} from './controllers/webhooks.js';

const app = express();

// ✅ Connect DB + Cloudinary
await connectDB();
await connectCloudinary();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api/company", companyRoutes);

app.get("/", (req, res) => res.send("✅ API working"));

app.get("/debug-sentry", (req, res) => {
  throw new Error("My first sentry error");
});

// ✅ Clerk webhook route with raw body (important for signature check)
app.post(
  "/webhooks",
  express.raw({ type: "application/json" }),
  clerkWebhooks
);
const PORT=process.env.PORT || 5000
// ✅ Sentry error handler
Sentry.setupExpressErrorHandler(app);

app.listen(PORT,()=>{
    console.log(`Server is running on port${PORT}`);
})


