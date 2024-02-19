import multer from "multer";
import youtube from "youtube-api";
import { v4 } from "uuid";

const storage = multer.diskStorage({
    destination: "./",
    filename: (req, file, cb) => {
        const newFileName = `${v4()}-${file.originalname}`;
        cb(null, newFileName);
    },
});
export const oAuth = youtube.authenticate({
    type: "oauth",
    client_id: process.env.YOUTUBE_CLIENT_ID,
    client_secret: process.env.YOUTUBE_CLIENT_SECRET,
    redirect_uri: process.env.YOUTUBE_REDIRECT_URL,
});

export const uploadVideoFile = multer({
    storage: storage,
}).single("videoFile");
