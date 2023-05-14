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
        if (req.user.userId === post.userId) {
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
    if (req.params.id === req.user.userId) {
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
    } else {
        return next(res.status(403).json("You can update only your post"));
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

export const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (err) {
        next(err);
    }
};
