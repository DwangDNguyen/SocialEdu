import express from "express";
const router = express.Router();
import {
    dislike,
    getUser,
    like,
    subscribe,
    unsubscribe,
    updateUser,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/auth.js";
// import verifyUser from "./verifyToken.js";

//get user
router.get("/find/:id", getUser);

//update user
router.put("/:id", verifyToken, updateUser);
router.put("/like/:videoId", verifyToken, like);
router.put("/dislike/:videoId", verifyToken, dislike);
router.put("/sub/:id", verifyToken, subscribe);
router.put("/unsub/:id", verifyToken, unsubscribe);
export default router;
