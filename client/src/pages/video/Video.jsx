/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useRef } from "react";
import "./video.scss";
import ReactLoading from "react-loading";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import Navbar from "../../components/Navbar/Navbar";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ReplyIcon from "@mui/icons-material/Reply";
import DownloadIcon from "@mui/icons-material/Download";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Comments from "../../components/Comments/Comments";
import Comment from "../../components/Comment/Comment";
import RecommendVid from "../../components/RecommendVid/RecommendVid";
import { comment, user, video } from "../../redux/axios/axios";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { fetchSuccess, like, dislike } from "../../redux/reducers/videoSlice";
import { format } from "timeago.js";
import { io } from "socket.io-client";
import axios from "axios";
import { subscription } from "../../redux/reducers/userSlice";

const Video = () => {
    const [channel, setChannel] = useState({});
    const [currentVid, setCurrentVid] = useState({});
    const [listComment, setListComment] = useState([]);
    const [notifications, setNotifications] = useState([]);

    const videoPlayerRef = useRef(null);
    const [videoState, setVideoState] = useState({});
    const [isPlaying, setIsPlaying] = useState(true);
    const [isReady, setIsReady] = useState(false);
    const path = useLocation().pathname.split("/")[2];
    const { currentVideo } = useSelector((state) => state.video);
    const currentUser = useSelector((state) => state.user.user);
    const socket = useSelector((state) => state.socket);
    const [isLoading, setIsLoading] = useState(false);
    // console.log(useSelector((state) => state.socket.socket));
    // const [viewVid, setViewVid] = useState(currentVideo.views);
    // console.log(currentUser);
    const dispatch = useDispatch();
    // const socket = useRef();
    // console.log(path);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const resVid = await video.get(`/find/${path}`);
                const resChannel = await user.get(
                    `/find/${resVid.data.userId}`
                );
                // const resComment = await comment.get(`/${resVid.data._id}`);
                if (currentUser._id !== resChannel.data._id) {
                    await video.put(`/view/${resVid.data._id}`);
                    // setViewVid((viewVid) => viewVid + 1);
                }
                setCurrentVid(resVid.data);
                setChannel(resChannel.data);
                dispatch(fetchSuccess(resVid.data));
                setIsLoading(false);
                // setListComment(resComment.data);
            } catch (err) {
                console.log(err);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [path, dispatch]);
    // console.log(channel);

    const onReady = React.useCallback(() => {
        if (!isReady) {
            const timeToStart = 0;
            videoPlayerRef.current.seekTo(timeToStart, "seconds");
            setIsReady(true);
        }
    }, [isReady]);
    // useEffect(() => {
    //     socket.current = io("ws://localhost:8901");
    // }, []);
    // useEffect(() => {
    //     socket.current.emit("addUserNotifications", currentUser.username);
    // }, [socket, currentUser]);
    const handleLike = async (type) => {
        await user.put("/like/" + currentVid._id);
        dispatch(like(currentUser._id));
        socket.current.emit("sendNotification", {
            senderName: currentUser.username,
            avatarImg: currentUser.avatar,
            receiverName: channel.username,
            type: type,
        });
    };

    const handleDislike = async (type) => {
        await user.put("/dislike/" + currentVid._id);
        dispatch(dislike(currentUser._id));
        socket.current.emit("sendNotification", {
            senderName: currentUser.username,
            avatarImg: currentUser.avatar,
            receiverName: channel.username,
            type: type,
        });
    };

    const handleSub = async () => {
        currentUser.subscribedUsers.includes(channel._id)
            ? await user.put(`/unsub/${channel._id}`)
            : await user.put(`/sub/${channel._id}`);

        dispatch(subscription(channel._id));
    };
    return (
        <div className="video">
            {/* <Sidebar />
            <div className="container">
                <Navbar socket={socket} notifications={notifications} /> */}
            {isLoading ? (
                <div className="loading">
                    <ReactLoading type="spokes" color="#a12727" />
                </div>
            ) : (
                <div className="video-container">
                    <div className="content-vid">
                        <div className="vid-wrapper">
                            <ReactPlayer
                                ref={videoPlayerRef}
                                url={currentVid.videoUrl}
                                width="100%"
                                height="500px"
                                playing={true}
                                controls={true}
                                onReady={onReady}
                                modestbranding={1}
                            />
                            {/* <iframe src={currentVid.videoUrl} controls /> */}
                        </div>
                        <h1 className="title-vid">{currentVid.title}</h1>
                        <div className="detail-vid-wrapper">
                            <div className="vid-author">
                                <div className="avt-author">
                                    <img src={channel.avatar} />
                                </div>
                                <div className="author-info">
                                    <h3 className="author-name">
                                        {channel.username}
                                    </h3>
                                    <span className="author-subscribed">
                                        {channel.subscribers} subscribers
                                    </span>
                                </div>
                            </div>
                            <div className="vid-controll">
                                <button
                                    className="subscribe-btn"
                                    onClick={handleSub}
                                >
                                    {currentUser.subscribedUsers?.includes(
                                        channel._id
                                    )
                                        ? "Subscribed"
                                        : "Subscribe"}
                                </button>
                                <div
                                    className="btn-vid-control like-btn"
                                    onClick={() => handleLike(1)}
                                >
                                    {currentVideo &&
                                    currentVideo.likes?.includes(
                                        currentUser?._id
                                    ) ? (
                                        <ThumbUpIcon />
                                    ) : (
                                        <ThumbUpOffAltIcon />
                                    )}{" "}
                                    {currentVideo && currentVideo.likes?.length}
                                </div>
                                <div
                                    className="btn-vid-control dislike-btn"
                                    onClick={() => handleDislike(2)}
                                >
                                    {currentVideo &&
                                    currentVideo.dislikes?.includes(
                                        currentUser?._id
                                    ) ? (
                                        <ThumbDownIcon />
                                    ) : (
                                        <ThumbDownOffAltIcon />
                                    )}{" "}
                                    Dislike
                                </div>
                                <div className="btn-vid-control share-btn">
                                    <ReplyIcon />
                                    Share
                                </div>
                                <div className="btn-vid-control download-btn">
                                    <DownloadIcon />
                                    Download
                                </div>
                            </div>
                        </div>
                        <div className="vid-description">
                            <div className="vid-interact">
                                <span className="video-view">
                                    {currentVid.views > 1
                                        ? currentVid.views + " views"
                                        : currentVid.views + " view"}
                                </span>
                                <FiberManualRecordIcon className="icon-dot" />
                                <span className="video-time-upload">
                                    {format(currentVid.createdAt)}
                                </span>
                            </div>
                            <div className="vid-desc">
                                {currentVid.description}
                            </div>
                        </div>
                        <div className="box-comment">
                            <h3 className="box-comment-title">Comments</h3>
                            <Comments videoId={path} />
                            {/* <div className="list-comment">
                                <Comment />
                                <Comment />
                                <Comment />
                                <Comment />
                            </div> */}
                        </div>
                    </div>
                    <div className="recommend-vid">
                        <RecommendVid tags={currentVid.tags} />
                    </div>
                </div>
            )}
            {/* </div> */}
        </div>
    );
};

export default Video;
