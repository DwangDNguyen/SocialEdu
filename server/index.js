import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import eventRoutes from "./routes/eventsRoute.js";
import userRoutes from "./routes/userRoute.js";
import authRoutes from "./routes/authRoute.js";
import videoRoutes from "./routes/videosRoute.js";
import commentRoutes from "./routes/commentRoute.js";
import conversationRoutes from "./routes/conversationsRoute.js";
import messageRoutes from "./routes/messagesRoute.js";
import postRoutes from "./routes/postRoute.js";
import notificationRoutes from "./routes/notificationRoute.js";

import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
dotenv.config();
mongoose.set("strictQuery", true);
const connect = () => {
    mongoose
        .connect(process.env.MONGO)
        .then(() => {
            console.log("Connect to DB");
        })
        .catch((err) => {
            console.log(err);
        });
};
app.use(cookieParser());
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(express.json());
app.use(cors());
app.use("/api/events", eventRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/conversation", conversationRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/post", postRoutes);
app.use("/api/notification", notificationRoutes);

app.listen(process.env.PORT || 5000, () => {
    console.log("connected");
    connect();
});
