import { clerkClient } from "@clerk/express";

export const updateRoleToEducator = async (req, res) => {
  try {
    const UserId = req.auth.userId;
    await clerkClient.users.updateUserMetadata(UserId, {
      publicMetadata: {
        role: "educator",
      },
    });
    res.json({ success: true, message: "you can publish a course now" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
