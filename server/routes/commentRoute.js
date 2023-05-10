import express from "express";
const router = express.Router();
import { verifyToken } from "../middleware/auth.js";
import {
    addComment,
    deleteComment,
    getComments,
} from "../controllers/commentController.js";

router.post("/", verifyToken, addComment);
router.delete("/:id", verifyToken, deleteComment);
router.get("/:videoId", getComments);

export default router;
