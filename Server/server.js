import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import * as Sentry from "@sentry/node";

import connectDB from './config/db.js';
import connectCloudinary from './config/cloudinary.js';
import './config/instrument.js'
import companyRoutes from './routes/companyRoutes.js';
import clerkWebhooks from './controllers/webhooks.js';

const app = express();
await connectDB()
// ✅ Clerk webhook must use raw body

// ✅ Other middlewares
app.use(cors());
app.use(express.json()); // For normal JSON APIs
app.use("/api/company", companyRoutes);


await connectCloudinary();

app.get("/", (req, res) => res.send("✅ API working"));
app.get("/debug-sentry",function mainHandler(req,res){
throw new Error("My first sentry error")
});
app.post(
  "/webhooks",
  
  clerkWebhooks
)


const PORT = process.env.PORT || 5000;
Sentry.setupExpressErrorHandler(app);
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
