import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        userId: { type: String },
        title: { type: String, required: true },
        image: { type: String, required: true },
        content: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model("Post", postSchema);
