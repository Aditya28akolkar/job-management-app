import User from "../models/User.js";
import { Webhook } from "svix";

export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const payload = req.body; // raw Buffer
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    console.log("📩 Clerk webhook hit!");
    console.log("📦 Raw payload:", payload.toString());

    // verify signature
    whook.verify(payload, headers);

    const { data, type } = JSON.parse(payload.toString());

    switch (type) {
      case "user.created": {
        const primaryEmail = data.email_addresses?.[0]?.email_address || null;

        const userData = {
          _id: data.id,
          email: primaryEmail,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          image: data.image_url,
          resume: ""
        };

        await User.create(userData);
        console.log("✅ User created:", userData._id);
        break;
      }

      case "user.updated": {
        await User.findByIdAndUpdate(
          data.id,
          {
            email: data.email_addresses?.[0]?.email_address || null,
            name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
            image: data.image_url,
          },
          { new: true }
        );
        console.log("✅ User updated:", data.id);
        break;
      }


      
      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        console.log("✅ User deleted:", data.id);
        break;
      }

      default:
        console.log("⚠️ Unhandled webhook type:", type);
    }

    return res.status(200).json({});
  } catch (error) {
    console.error("❌ Clerk webhook error:", error.message);
    return res.status(400).json({ success: false, message: "Webhook error" });
  }
};
