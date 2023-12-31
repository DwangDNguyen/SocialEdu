import express from "express";
const router = express.Router();
import {
    dislike,
    getUser,
    like,
    subscribe,
    unsubscribe,
    updateUser,
    getAllUser,
    getUserMostSubscribed,
    getNewUsers,
    deleteUser,
    getListUserSub,
    searchUsers,
} from "../controllers/userController.js";
import { isAdmin, verifyToken } from "../middleware/auth.js";
// import verifyUser from "./verifyToken.js";

//get user
router.get("/find/:id", getUser);

//update user
router.put("/:id", verifyToken, updateUser);
router.put("/like/:videoId", verifyToken, like);
router.put("/dislike/:videoId", verifyToken, dislike);
router.put("/sub/:id", verifyToken, subscribe);
router.put("/unsub/:id", verifyToken, unsubscribe);
router.get("/getAllUser", getAllUser);
router.get("/getUserMostSubscribed", getUserMostSubscribed);
router.get("/getNewUsers", getNewUsers);
router.delete("/delete/:id", isAdmin, deleteUser);
router.post("/getUserSubscribed", getListUserSub);
router.get("/search", verifyToken, searchUsers);

export default router;
