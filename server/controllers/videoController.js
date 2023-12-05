import Video from "../models/video.js";
import User from "../models/users.js";
import ContentBasedRecommender from "content-based-recommender";
export async function getVideo(req, res, next) {
    try {
        const video = await Video.findById(req.params.id);

        // console.log(user.watchedVideos);
        res.status(200).json(video);
    } catch (err) {
        next(err);
    }
}
export async function addWatchedVideo(req, res, next) {
    try {
        const user = await User.findById(req.user.userId);

        const isVideoExists = user.watchedVideos?.some(
            (video) => video._id === req.body._id
        );

        if (!isVideoExists) {
            user.watchedVideos.push({
                _id: req.body._id,
                title: req.body.title,
            });
            await user.save();
        }
        // console.log(user);
        res.status(200).json({ message: "Video watched successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to watch video" });
    }
}

export async function deleteAllWatchedVideo(req, res, next) {
    try {
        const user = await User.findById(req.user.userId);
        user.watchedVideos = [];
        await user.save();
        res.status(200).json({
            message: "All videos watched delete successfully",
        });
    } catch (err) {
        next(err);
    }
}
export async function getVideoUser(req, res, next) {
    try {
        const videos = await Video.find({ userId: req.params.id });
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
}
export async function addVideo(req, res, next) {
    const newVideo = new Video({ ...req.body, userId: req.user.userId });
    console.log(req.user);
    try {
        const savedVideo = await newVideo.save();
        res.status(200).json(savedVideo);
    } catch (err) {
        next(err);
    }
}

export async function updateVideo(req, res, next) {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return res.status(404).json("Video not found");
        if (req.user.userId === video.userId || req.user.isAdmin) {
            const updatedVideo = await Video.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            res.status(200).json(updatedVideo);
        }
    } catch (err) {
        next(err);
    }
}
export async function deleteVideo(req, res, next) {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return res.status(404).json("Video not found");
        if (req.user.userId === video.userId || req.user.isAdmin) {
            await Video.findByIdAndDelete(req.params.id);
            res.status(200).json("Video deleted");
        } else {
            res.status(403).json("you can delete only your video");
        }
    } catch (err) {
        next(err);
    }
}

export async function randomVideo(req, res, next) {
    try {
        var arrTags = [];
        const currentUser = await User.findById(req.user.userId);
        const listWatchedVid = currentUser.watchedVideos;
        const listWatchedVideos = listWatchedVid.map((video) => ({
            id: video._id,
            content: video.title,
        }));
        const allVid = await Video.find();
        const vids = allVid.map((video) => ({
            id: video._id,
            content: video.title,
        }));
        const vidMap = vids.reduce((acc, vid) => {
            acc[vid.id] = vid;
            return acc;
        }, {});
        const recommender = new ContentBasedRecommender();

        recommender.trainBidirectional(listWatchedVideos, vids);

        for (let watchedVids of listWatchedVideos) {
            const relatedVids = recommender.getSimilarDocuments(watchedVids.id);
            const tags = relatedVids.map((t) => vidMap[t.id].content);
            // console.log(watchedVids.content, "related tags:", tags);
            arrTags.push(...tags);
        }
        const titleVidRec = [...new Set(arrTags)];
        console.log(titleVidRec);
        console.log(titleVidRec.length);
        if (titleVidRec.length < 12) {
            const maxItemsToAdd = 12 - titleVidRec.length;
            while (titleVidRec.length < 12) {
                const randomItem =
                    vids[Math.floor(Math.random() * vids.length)].content;
                console.log(randomItem);
                if (!titleVidRec.includes(randomItem)) {
                    titleVidRec.push(randomItem);
                }
            }
        }
        console.log(titleVidRec);

        const listVidRecommended = await Video.find({
            title: { $in: titleVidRec },
        });
        // console.log(listVidRecommended);
        // const videos = await Video.aggregate([{ $sample: { size: 15 } }]);
        // console.log(req.user);
        res.status(200).json(listVidRecommended);
    } catch (err) {
        next(err);
    }
}
// export async function randomMoreVideo(req, res, next) {
//     try {
//         const allVideo = await Video.find();
//         const allVideosCopy = [...allVideo];
//         const randomVideos = [];
//         while (randomVideos.length < 6) {
//             const randomIndex = Math.floor(
//                 Math.random() * allVideosCopy.length
//             );
//             const randomVideo = allVideosCopy.splice(randomIndex, 1)[0];
//             randomVideos.push(randomVideo);
//         }
//         res.status(200).json(randomVideos);
//     } catch (err) {
//         next(err);
//     }
// }
export async function randomRecommendVideo(req, res, next) {
    try {
        const recommender = new ContentBasedRecommender();
        const videos = await Video.find();
        const transformedVideos = videos.map((video) => ({
            id: video._id,
            ...video,
            content: video.title,
        }));
        const user = await User.findById(req.user.userId);
        const watchedVideos = user.watchedVideos;
        const watchedVidTransform = watchedVideos.map((video) => ({
            id: video._id,
            ...video,
            content: video.title,
        }));
        recommender.train(transformedVideos, { fields: ["title", "tags"] });
        const watchedVideoTitles = watchedVidTransform.map(
            (video) => video.title
        );
        const recommendedVideos = recommender.getSimilarDocuments(
            watchedVideoTitles,
            5
        );

        // const videos = await Video.aggregate([{ $sample: { size: 5 } }]);
        console.log(recommendedVideos);

        res.status(200).json(recommendedVideos);
    } catch (err) {
        next(err);
    }
}
export async function searchVideo(req, res, next) {
    try {
        const videos = await Video.find({
            title: { $regex: req.query.q, $options: "i" },
        }).limit(40);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
}

export async function addView(req, res, next) {
    try {
        await Video.findByIdAndUpdate(req.params.id, {
            $inc: {
                views: 1,
            },
        });
        res.status(200).json("the view has been increased");
    } catch (err) {
        next(err);
    }
}

export async function getByTag(req, res, next) {
    const tags = req.query.tags.split(",");
    try {
        const videos = await Video.find({ tags: { $in: tags } }).limit(20);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
}

export async function getByTagAndUser(req, res, next) {
    const tags = req.query.tags.split(",");
    const userId = req.query.userId;
    try {
        const videos = await Video.find({
            $and: [
                {
                    tags: { $in: tags },
                },
                { userId: userId },
            ],
        }).limit(20);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
}

export async function getAllVideos(req, res, next) {
    try {
        const videos = await Video.find();
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
}

export async function getVideosMostViewed(req, res, next) {
    try {
        const videos = await Video.find().sort({ views: -1 }).limit(5);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
}

export async function getVideosNewest(req, res, next) {
    try {
        const videos = await Video.find().sort({ createdAt: -1 }).limit(5);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
}

export async function downloadVideo(req, res, next) {
    try {
        const video = await Video.findById(req.params.id);
        const path = `${process.cwd()}/uploads/${video.fileName}`;
        res.download(path);
    } catch (err) {
        next(err);
    }
}

export async function trendingVideo(req, res, next) {
    try {
        const page = parseInt(req.query.page) || 1;
        const videosPerPage = 5;
        const startIndex = (page - 1) * videosPerPage;
        const endIndex = page * videosPerPage;
        const videos = await Video.find().sort({ views: -1 }).limit(30);
        const paginatedVideos = videos.slice(startIndex, endIndex);
        res.status(200).json(paginatedVideos);
    } catch (err) {
        next(err);
    }
}
