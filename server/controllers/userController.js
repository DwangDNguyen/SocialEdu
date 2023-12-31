import User from "../models/users.js";
import Video from "../models/video.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";

export async function getUser(req, res) {
    const { id } = req.params;
    try {
        if (!id) return res.status(501).json({ err: "Invalid user" });
        User.findOne({ _id: id }, function (err, user) {
            if (err) return res.status(500).json(err);
            if (!user)
                return res.status(500).json({ err: "Couldn't find user" });
            const { password, ...inf } = Object.assign({}, user.toJSON());
            return res.status(200).json(inf);
        });
    } catch (err) {
        res.status(500).json(err);
    }
}

export async function updateUser(req, res, next) {
    // console.log(req.user);
    // console.log("Update req.params.id:" + req.params.id);
    // console.log("update req.user.userId: " + req.user.userId);
    // try {
    //     const { id } = req.user;
    //     if (id) {
    //         const body = req.body;

    //         // update the data
    //         User.updateOne({ _id: id }, body, function (err, data) {
    //             if (err) throw err;

    //             return res.status(201).send({ msg: "Record Updated...!" });
    //         });
    //     } else {
    //         return res.status(401).send({ error: "User Not Found...!" });
    //     }
    // } catch (err) {
    //     return res.status(401).send({ err });
    // }
    console.log(req.user);
    if (req.params.id === req.user.userId || req.user.isAdmin) {
        try {
            const currentUser = await User.findById(req.user.userId);
            const thisUser = await User.findById(req.params.id);
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            fs.renameSync(
                `./certificate/${thisUser.username}_public.pem`,
                `./certificate/${updatedUser.username}_public.pem`
            );
            fs.renameSync(
                `./certificate/${thisUser.username}_private.pem`,
                `./certificate/${updatedUser.username}_private.pem`
            );
            res.status(200).json(updatedUser);
        } catch (err) {
            next(err);
        }
    } else {
        return next(res.status(403).json("You can update only your account"));
    }
}

export const subscribe = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(
            req.user.userId,
            {
                $push: {
                    subscribedUsers: req.params.id,
                },
            },
            { useFindAndModify: false }
        );
        await User.findByIdAndUpdate(
            req.params.id,
            {
                $inc: {
                    subscribers: 1,
                },
            },
            { useFindAndModify: false }
        );
        res.status(200).json("Subscription successful");
    } catch (err) {
        next(err);
    }
};

export const unsubscribe = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(
            req.user.userId,
            {
                $pull: {
                    subscribedUsers: req.params.id,
                },
            },
            { useFindAndModify: false }
        );
        await User.findByIdAndUpdate(
            req.params.id,
            {
                $inc: {
                    subscribers: -1,
                },
            },
            { useFindAndModify: false }
        );
        res.status(200).json("Unsubscription successful");
    } catch (err) {
        next(err);
    }
};

export const like = async (req, res, next) => {
    const id = req.user.userId;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { likes: id },
            $pull: { dislikes: id },
        });
        res.status(200).json("The video has been liked");
    } catch (err) {
        next(err);
    }
};
export const dislike = async (req, res, next) => {
    const id = req.user.userId;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { dislikes: id },
            $pull: { likes: id },
        });
        res.status(200).json("The video has been disliked");
    } catch (err) {
        next(err);
    }
};
export const getAllUser = async (req, res, next) => {
    try {
        // const users = await User.find({ isAdmin: { $ne: true } });
        const users = await User.find({ isAdmin: { $ne: true } });
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};

export const getUserMostSubscribed = async (req, res, next) => {
    try {
        const users = await User.find({ isAdmin: { $ne: true } })
            .sort({ subscribers: -1 })
            .limit(5);
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};

export const getNewUsers = async (req, res, next) => {
    try {
        const users = await User.find({ isAdmin: { $ne: true } })
            .sort({ createdAt: -1, isAdmin: false })
            .limit(5);
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted");
    } catch (err) {
        next(err);
    }
};

export const getListUserSub = async (req, res, next) => {
    try {
        const { userIds } = req.body;

        const users = await User.find({ _id: { $in: userIds } });

        res.status(200).json(users);
    } catch (error) {
        console.error("Error getting user info:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const searchUsers = async (req, res, next) => {
    const query = req.query.q;
    const currentUserId = req.user.userId;
    const currentUser = await User.findById(currentUserId);
    // const isAdmin = req.user.isAdmin;
    const adminUser = await User.findOne({ isAdmin: true });
    try {
        const users = await User.find({
            $and: [
                {
                    $or: [
                        { username: { $regex: query, $options: "i" } },
                        { email: { $regex: query, $options: "i" } },
                    ],
                },
                {
                    username: {
                        $nin: [currentUser.username, adminUser.username],
                    },
                },
            ],
        });
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};
