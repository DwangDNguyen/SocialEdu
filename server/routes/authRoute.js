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
    
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/auth.js";

//register
router.post("/register", register);

//login
router.post("/login", verifyUser, login);

//refreshToken
// router.post("/refreshToken", refreshToken);
export default router;
