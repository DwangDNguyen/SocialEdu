import express from "express";
import {
    addPost,
    deletePost,
    getRandomPosts,
    getPost,
    getSuggestedPosts,
    updatePost,
    getUserPost,
    searchPost,
} from "../controllers/postController.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

router.post("/", verifyToken, addPost);
router.delete("/:id", verifyToken, deletePost);
router.get("/find/:id", getPost);
router.get("/posts", getRandomPosts);
router.get("/suggestedPosts", getSuggestedPosts);
router.put("/update/:id", verifyToken, updatePost);
router.get("/listPost/:id", getUserPost);
router.get("/search", searchPost);

export default router;
