import { Webhook } from "svix";
import User from "../models/User.js"; // Ensure the correct path to the User model

export const clerkWebhooks = async (req, res) => {
    try {
        console.log("Webhook triggered");
        console.log("Headers:", req.headers);
        console.log("Body:", req.body);

        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Verify the webhook payload
        const payload = whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        });

        console.log("Verified Payload:", payload);

        const { data, type } = payload;

        switch (type) {
            case "user.created": {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: `${data.first_name} ${data.last_name}`,
                    imageUrl: data.image_url,
                };
                console.log("User Data to Save:", userData);
                await User.create(userData); // Save the user data to MongoDB
                return res.status(200).json({ success: true, message: "User created" });
            }

            case "user.updated": {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: `${data.first_name} ${data.last_name}`,
                    imageUrl: data.image_url,
                };
                console.log("User Data to Update:", userData);
                await User.findByIdAndUpdate(data.id, userData, { new: true });
                return res.status(200).json({ success: true, message: "User updated" });
            }

            case "user.deleted": {
                console.log("User ID to Delete:", data.id);
                await User.findByIdAndDelete(data.id);
                return res.status(200).json({ success: true, message: "User deleted" });
            }

            default:
                console.log("Unhandled Event Type:", type);
                return res.status(400).json({ success: false, message: "Unhandled event type" });
        }
    } catch (error) {
        console.error(`Error processing webhook: ${error.message}`);
        return res.status(500).json({ success: false, message: error.message });
    }
};