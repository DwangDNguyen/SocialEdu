import express from "express";
import {
    addPost,
    deletePost,
    getAllPosts,
    getPost,
} from "../controllers/postController.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

router.post("/", verifyToken, addPost);
router.delete("/:id", verifyToken, deletePost);
router.get("/find/:id", getPost);
router.get("/", getAllPosts);
export default router;
