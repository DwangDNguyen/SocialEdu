import express from "express";
import youtube from "youtube-api";

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
    deleteAllWatchedVideo,
} from "../controllers/videoController.js";
import { isAdmin, verifyToken } from "../middleware/auth.js";
import { oAuth, uploadVideoFile } from "../middleware/video.js";
router.post("/", verifyToken, addVideo);
// router.get("/oauth2Callback", (req, res) => {
//     oAuth.getToken(req.query.code, (err, tokens) => {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         const { videoUrl, ...info } = req.body;
//         oAuth.setCredentials(tokens);
//         youtube.video.insert(
//             {
//                 resource: {
//                     snippet: {
//                         ...info,
//                     },
//                     status: {
//                         privacyStatus: "private",
//                     },
//                     part: "snippet,status",
//                     media: {
//                         body: fs.createReadStream(videoUrl),
//                     },
//                 },
//             },
//             (err, data) => {
//                 console.log(data);
//                 process.exit();
//             }
//         );
//     });
// });
router.get("/randomVideo", verifyToken, randomVideo);
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
router.put("/deleteAllWatchedVideo", verifyToken, deleteAllWatchedVideo);

export default router;
