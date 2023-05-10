import express from "express";
import {
    newConversation,
    getConversation,
    getConversationTwoUsers,
    // deleteConversation,
    getOneConversation,
} from "../controllers/conversationController.js";
const router = express.Router();

router.post("/", newConversation);
router.get("/:userId", getConversation);
router.get("/find/:userId/:receiverId", getConversationTwoUsers);
// router.delete("/", deleteConversation);
router.get("/findOne/:id", getOneConversation);

export default router;
