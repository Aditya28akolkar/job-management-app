import User from "../models/User.js";
import { Webhook } from "svix";

export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // ✅ Use raw buffer (req.body is already Buffer because of express.raw())
    const payload = req.body;
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // ✅ Verify signature
    whook.verify(payload, headers);

    // ✅ Parse after verifying
    const { data, type } = JSON.parse(payload.toString());

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0]?.email_address,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          image: data.image_url,
          resume: "",
        };
        await User.create(userData);
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0]?.email_address,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          image: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData, { new: true });
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        break;
      }

      default:
        console.log("⚠️ Unhandled webhook type:", type);
    }

    // ✅ Must return 200 with empty object
    return res.status(200).json({});
  } catch (error) {
    console.error("❌ Clerk webhook error:", error);
    return res.status(400).json({ success: false, message: "Webhook error" });
  }
};
