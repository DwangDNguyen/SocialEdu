import Post from "../models/post.js";

export const addPost = async (req, res, next) => {
    const post = new Post({ ...req.body, userId: req.user.userId });
    try {
        const savedPost = await post.save();
        res.status(200).json(savedPost);
    } catch (err) {
        next(err);
    }
};

export const deletePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (req.user.userId === post.userId || req.user.isAdmin) {
            await Post.deleteOne({ _id: req.params.id });
            res.status(200).json("Post deleted");
        } else {
            res.status(403).json("you can delete only your post");
        }
    } catch (err) {
        next(err);
    }
};

export const updatePost = async (req, res, next) => {
    if (
        (req.body.image !== null &&
            req.body.title !== null &&
            req.body.content !== null) ||
        req.user.isAdmin
    ) {
        try {
            const updatePost = await Post.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            res.status(200).json(updatePost);
        } catch (err) {
            next(err);
        }
    }
};

export const getPost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        next(err);
    }
};

export const getRandomPosts = async (req, res, next) => {
    try {
        const posts = await Post.aggregate([{ $sample: { size: 9 } }]);
        res.status(200).json(posts);
    } catch (err) {
        next(err);
    }
};

export const getSuggestedPosts = async (req, res, next) => {
    try {
        const suggestedPosts = await Post.aggregate([{ $sample: { size: 3 } }]);
        res.status(200).json(suggestedPosts);
    } catch (err) {
        next(err);
    }
};

export const getUserPost = async (req, res, next) => {
    try {
        const post = await Post.find({ userId: req.params.id });
        res.status(200).json(post);
    } catch (err) {
        next(err);
    }
};

export async function searchPost(req, res, next) {
    try {
        const posts = await Post.find({
            title: { $regex: req.query.q, $options: "i" },
        }).limit(40);
        res.status(200).json(posts);
    } catch (err) {
        next(err);
    }
}
