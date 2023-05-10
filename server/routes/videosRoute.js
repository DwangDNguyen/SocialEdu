import express from "express";
const router = express.Router();
import Video from "../models/video.js";
import {
    addVideo,
    addView,
    getVideo,
    getVideoUser,
    randomVideo,
    randomRecommendVideo,
    getByTag,
    deleteVideo,
    getByTagAndUser,
    searchVideo,
} from "../controllers/videoController.js";
import { verifyToken } from "../middleware/auth.js";
router.post("/", verifyToken, addVideo);
router.get("/randomVideo", randomVideo);
router.get("/randomRecommendVideo", randomRecommendVideo);
router.delete("/video/:id", verifyToken, deleteVideo);
// router.get("/:id", getVideo);
router.put("/view/:id", addView);
router.get("/find/:id", getVideo);
router.get("/findUser/:id", getVideoUser);
router.get("/tags", getByTag);
router.get("/user/tags", getByTagAndUser);
router.get("/search", searchVideo);

export default router;
