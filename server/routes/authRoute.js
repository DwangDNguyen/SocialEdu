import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";
import User from "../models/users.js";
import pkg from "jsonwebtoken";
const { jwt } = pkg;
import {
    verifyUser,
    register,
    login,
    generateOtp,
    refreshToken,
    verifyOtp,
    resetPassword,
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/auth.js";

//register
router.post("/register", register);

//login
router.post("/login", verifyUser, login);
router.post("/refreshToken", refreshToken);
router.post("/send-otp", generateOtp);
router.post("/verifyOtp", verifyOtp);
router.put("/resetPassword", resetPassword);

//refreshToken
// router.post("/refreshToken", refreshToken);
export default router;
