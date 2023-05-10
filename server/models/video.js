import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        views: {
            type: Number,
            default: 0,
        },
        ImgUrl: {
            type: String,
            required: true,
        },
        videoUrl: {
            type: String,
            required: true,
        },
        likes: {
            type: [String],
            required: true,
            default: [],
        },
        dislikes: {
            type: [String],
            required: true,
            default: [],
        },
        tags: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true }
);
export default mongoose.model("Videos", VideoSchema);
