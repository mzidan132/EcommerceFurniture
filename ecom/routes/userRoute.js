// src/routes/userRouter.js
import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";
import loginAdmin from "../middleware/loginAdmin.js";

const userRouter = express.Router();

// Route for user registration
userRouter.post("/register", registerUser);

// Route for regular user login
userRouter.post("/login", loginUser);

// Route for admin login
userRouter.post("/loginadmin", loginAdmin, loginUser);

export default userRouter;
