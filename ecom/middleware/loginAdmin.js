// src/middleware/loginAdmin.js
import userModel from "../models/userModel.js";

const loginAdmin = async (req, res, next) => {
    const { email } = req.body;

    try {
        // Get all users from the database
        const users = await userModel.find({}).sort({ _id: 1 }); // Sort by _id to get the first user
        const firstUser = users[0]; // Assuming the first user in the sorted list is the admin

        if (!firstUser) {
            return res.json({ success: false, message: "No users found in the database." });
        }

        if (firstUser.email !== email) {
            return res.json({ success: false, message: "Only the first user can log in as admin." });
        }

        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error checking admin status." });
    }
};

export default loginAdmin;
