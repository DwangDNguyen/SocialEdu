import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookies from "./cookies.js";
import readline from "readline";
import Bard from "./Bard.js";
import https from "https";
import fs from "fs";
import path from "path";
import { generateKeyPairSync } from "crypto";
import eventRoutes from "./routes/eventsRoute.js";
import userRoutes from "./routes/userRoute.js";
import authRoutes from "./routes/authRoute.js";
import videoRoutes from "./routes/videosRoute.js";
import commentRoutes from "./routes/commentRoute.js";
import conversationRoutes from "./routes/conversationsRoute.js";
import messageRoutes from "./routes/messagesRoute.js";
import postRoutes from "./routes/postRoute.js";
import notificationRoutes from "./routes/notificationRoute.js";
import chatBotRoutes from "./routes/chatBotRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// const configuration = new Configuration({
//     organization: process.env.OPENAI_ORGANIZATION,
//     apiKey: process.env.OPENAI_KEY,
// });

const app = express();
dotenv.config();
mongoose.set("strictQuery", true);

// const sslServer = https.createServer(
//     {
//         key: fs.readFileSync("./certificate/key.pem"),
//         cert: fs.readFileSync("./certificate/cert.pem"),
//     },
//     app
// );
// const { publicKey, privateKey } = generateKeyPairSync("rsa", {
//     modulusLength: 4096,
//     publicKeyEncoding: {
//         type: "spki",
//         format: "pem",
//     },
//     privateKeyEncoding: {
//         type: "pkcs8",
//         format: "pem",
//     },
// });

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
app.use("/api/video", videoRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/conversation", conversationRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/post", postRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/chatBot", chatBotRoutes);

// const main = async () => {
//     try {
//         // Get the cookie
//         const cookie = cookies.getCookie();
//         const rl = readline.createInterface({
//             input: process.stdin,
//             output: process.stdout,
//         });
//         // If the cookie doesn't exist, prompt the user to enter it
//         if (!cookie) {
//             const userCookie = await new Promise((resolve) => {
//                 rl.question("Please enter your cookie: ", resolve);
//             });

//             // Set the cookie
//             cookies.setCookie(userCookie);
//             rl.close();
//         }

//         const myBard = new Bard(cookie);
//         const input = process.argv.slice(2).join(" ");
//         if (!input) {
//             throw new Error("Please enter a question.");
//         }

//         const result = await myBard.ask(input);

//         console.log(result);
//         process.exit(0);
//     } catch (err) {
//         // console.log(err);
//         console.log('Please run again.\n\nType "node index.js <your input>"');
//     }
// };

// main();

app.listen(process.env.PORT || 5000, () => {
    console.log("connected");
    connect();
});
