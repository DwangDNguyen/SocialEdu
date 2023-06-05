import Comment from "../models/comments.js";
import Video from "../models/video.js";
export const addComment = async (req, res, next) => {
    const newComment = new Comment({ ...req.body, userId: req.user.userId });
    try {
        const savedComment = await newComment.save();
        res.status(200).json(savedComment);
    } catch (err) {
        next(err);
    }
};
export const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id);
        // const video = await Video.findById(res.params.id);
        console.log(comment);

        if (req.user.userId === comment.userId || req.user.isAdmin) {
            await Comment.deleteOne({ _id: req.params.id });
            res.status(200).json("Comment deleted");
        } else {
            res.status(403).json("you can delete only your comment");
        }
    } catch (err) {
        next(err);
    }
};

export const getComments = async (req, res, next) => {
    try {
        const comment = await Comment.find({ videoId: req.params.videoId });
        res.status(200).json(comment);
    } catch (err) {
        next(err);
    }
};

export const updateComment = async (req, res, next) => {
    try {
        const thisComment = await Comment.findById(req.params.id);
        if (!thisComment) return res.status(404).json("thisComment not found");
        if (req.user.userId === thisComment.userId || req.user.isAdmin) {
            const updatedVideo = await Video.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            res.status(200).json(updatedVideo);
        }

        res.status(200).json(updatedComment);
    } catch (err) {
        next(err);
    }
};
