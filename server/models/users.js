import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please provide a username"],
            unique: [true, "username exist"],
        },
        email: {
            type: String,
            required: [true, "Please provide a email"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
        },
        avatar: {
            type: String,
        },
        phone: {
            type: String,
            unique: true,
            required: [true, "Please provide a phone number"],
        },
        subscribers: {
            type: Number,
            default: 0,
        },
        subscribedUsers: {
            type: [String],
        },
        token: {
            type: String,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        watchedVideos: {
            type: Array,
        },
        publicKey: {
            type: String,
        },
    },
    { timestamps: true }
);
export default mongoose.model("Users", UsersSchema);
