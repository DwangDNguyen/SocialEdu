import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
    {
        conversationId: { type: String },
        sender: { type: String },
        text: { type: String },
        receiverId: { type: String },
    },
    { timestamps: true }
);

export default mongoose.model("Message", MessageSchema);
