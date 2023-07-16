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
    getAllVideos,
    getVideosMostViewed,
    getVideosNewest,
    updateVideo,
    trendingVideo,
    addWatchedVideo,
} from "../controllers/videoController.js";
import { isAdmin, verifyToken } from "../middleware/auth.js";
router.post("/", verifyToken, addVideo);
router.get("/randomVideo", randomVideo);
router.get("/randomRecommendVideo", verifyToken, randomRecommendVideo);
router.post("/watchedVideo", verifyToken, addWatchedVideo);
// router.get("/randomMoreVideos", randomMoreVideo);
router.delete("/video/:id", verifyToken, deleteVideo);
// router.get("/:id", getVideo);
router.put("/update/:id", verifyToken, updateVideo);
router.put("/view/:id", addView);
router.get("/find/:id", verifyToken, getVideo);
router.get("/findUser/:id", getVideoUser);
router.get("/tags", getByTag);
router.get("/user/tags", getByTagAndUser);
router.get("/search", searchVideo);
router.get("/getAllVideos", getAllVideos);
router.get("/getVideosMostViewed", getVideosMostViewed);
router.get("/getVideosNewest", getVideosNewest);
router.get("/getTrending", trendingVideo);

export default router;
