import Video from "../models/video.js";
import User from "../models/users.js";
export async function getVideo(req, res, next) {
    try {
        const video = await Video.findById(req.params.id);
        res.status(200).json(video);
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
        if (req.user.id === video.userId) {
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
        if (req.user.userId === video.userId) {
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
        const videos = await Video.aggregate([{ $sample: { size: 15 } }]);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
}
export async function randomRecommendVideo(req, res, next) {
    try {
        const videos = await Video.aggregate([{ $sample: { size: 5 } }]);
        res.status(200).json(videos);
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
