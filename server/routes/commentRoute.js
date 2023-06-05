import express from "express";
const router = express.Router();
import { isAdmin, verifyToken } from "../middleware/auth.js";
import {
    addComment,
    deleteComment,
    getComments,
    updateComment,
} from "../controllers/commentController.js";

router.post("/", verifyToken, addComment);
router.delete("/:id", verifyToken, deleteComment);
router.get("/:videoId", getComments);
router.put("/update/:id", verifyToken, updateComment);

export default router;
