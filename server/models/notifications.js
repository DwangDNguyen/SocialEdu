import mongoose from "mongoose";

const notificationsSchema = new mongoose.Schema(
    {
        senderId: {
            type: String,
            required: true,
        },
        receiverId: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);
export default mongoose.model("Notifications", notificationsSchema);
