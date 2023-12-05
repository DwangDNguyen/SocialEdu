import express from "express";

import {
    addMessage,
    getMessage,
    // getPublicKey,
} from "../controllers/messageController.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

router.post("/", addMessage);
router.get("/:conversationId", verifyToken, getMessage);
// router.get("/publickey/:receiverId", getPublicKey);

export default router;
