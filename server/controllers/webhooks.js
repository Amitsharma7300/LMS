import { Webhook } from "svix";
import User from "../models/User.js"; // Ensure the correct path to the User model

export const clerkWebhooks = async (req, res) => {
    try {
    const whook=new Webhook(process.env.CLERK_WEBHOOK_SECRET)
await whook.verify(JSON.stringify(req.body),{
    "svix-id":req.headers["svix-id"],
    "svix-timestamp":req.headers["svix-timestamp"],
    "svix-signature":req.headers["svix-signature"]
})
          const {data,type}=req.body

        switch (type) {
            case "user.created": {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name +"" +data.last_name,
                    imageUrl: data.image_url,
                };
                await User.create(userData); // Save the user data to MongoDB
                 res.json({ success: true, message: "User created" });
                 break;
            }

            case "user.updated": {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: data.first_name+""+data.last_name,
                    imageUrl: data.image_url,
                };
        
                await User.findByIdAndUpdate(data.id, userData);
                res.json({ success: true, message: "User updated" });
                break;
            }

            case "user.deleted": {

                await User.findByIdAndDelete(data.id);
                res.json({ success: true, message: "User deleted" });
                break;
            }

            default:
                console.log("Unhandled Event Type:", type);
                return res.status(400).json({ success: false, message: "Unhandled event type" });
        }
    } catch (error) {
    
         res.json({ success: false, message: error.message });
    }
};