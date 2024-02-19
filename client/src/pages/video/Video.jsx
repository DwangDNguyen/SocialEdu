/* eslint-disable react/jsx-no-target-blank */
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
import {
    FacebookIcon,
    TwitterIcon,
    FacebookMessengerIcon,
    FacebookShareButton,
    TwitterShareButton,
    FacebookMessengerShareButton,
} from "react-share";
import Comments from "../../components/Comments/Comments";
import Comment from "../../components/Comment/Comment";
import RecommendVid from "../../components/RecommendVid/RecommendVid";
import { comment, user, video } from "../../redux/axios/axios";
import { Link, useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { fetchSuccess, like, dislike } from "../../redux/reducers/videoSlice";
import { format } from "timeago.js";
import { io } from "socket.io-client";
import axios from "axios";
import { subscription } from "../../redux/reducers/userSlice";
import { useTranslation } from "react-i18next";
import {
    updateTimeVideo,
    addTimeVideo,
    resetTimeVideo,
} from "../../redux/reducers/timeVideoReducer";

const Video = () => {
    const { t } = useTranslation("video");
    const { currentVideo } = useSelector((state) => state.video);
    const currentUser = useSelector((state) => state.user.user);
    // const socket = useSelector((state) => state.socket);
    // const listTimeVid = useSelector((state) => state.timeVideo.timeVideo);
    // const currentTimeVideo = useSelector(
    //     (state) => state.timeVideo.currentTimeVideo
    // );
    // const [currentTimeVid, setCurrentTimeVid] = useState(
    //     currentTimeVideo.time || 0
    // );
    const [channel, setChannel] = useState({});
    const [currentVid, setCurrentVid] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const videoPlayerRef = useRef(null);
    const [isReady, setIsReady] = useState(false);
    const path = useLocation().pathname.split("/")[2];
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    // const socket = useRef();
    // console.log(currentTimeVideo);
    // console.log(listTimeVid);
    // useEffect(() => {
    //     const findTimeById = (id) => {
    //         const videoObject = listTimeVid?.find((item) => item.id === id);
    //         console.log("videoObject: " + videoObject);
    //         setCurrentTimeVid(videoObject ? videoObject.time : 0);
    //     };

    //     findTimeById(path);
    // }, [path]);
    // useEffect(() => {
    //     const handleBeforeUnload = (event) => {
    //         dispatch(
    //             addTimeVideo({
    //                 id: currentVid._id,
    //                 time: currentTimeVid,
    //             })
    //         );
    //         const videoObject = listTimeVid?.find((item) => item.id === path);

    //         setCurrentTimeVid(videoObject ? videoObject.time : 0);
    //     };

    //     const handleUnload = () => {
    //         console.log("unloading");
    //     };

    //     window.addEventListener("beforeUnload", handleBeforeUnload);
    //     window.addEventListener("unload", handleUnload);

    //     return () => {
    //         window.removeEventListener("beforeUnload", handleBeforeUnload);
    //         window.removeEventListener("unload", handleUnload);
    //     };
    // }, [dispatch, path, currentTimeVid]);

    // console.log(currentTimeVid);
    const onReady = React.useCallback(() => {
        if (!isReady) {
            const timeToStart = 0;
            videoPlayerRef.current.seekTo(timeToStart, "seconds");
            setIsReady(true);
        }
    }, [isReady]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const resVid = await video.get(`/find/${path}`);
                await video.post("/watchedVideo", resVid.data);
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
    const handleLike = async (type) => {
        await user.put("/like/" + currentVid._id);
    };

    const handleDislike = async (type) => {
        await user.put("/dislike/" + currentVid._id);
    };

    const handleSub = async () => {
        if (currentUser.subscribedUsers.includes(channel._id)) {
            await user.put(`/unsub/${channel._id}`);
        } else {
            await user.put(`/sub/${channel._id}`);
        }

        dispatch(subscription(channel._id));
    };
    // const handleVideoProgress = (state) => {
    //     const currentTime = state.played * videoPlayerRef.current.getDuration();
    //     setCurrentTimeVid(currentTime);
    // };
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
                                // onProgress={(state) =>
                                //     handleVideoProgress(state)
                                // }
                                // onPause={() => {
                                //     setCurrentTimeVid(
                                //         videoPlayerRef.current.getCurrentTime()
                                //     );
                                //     // dispatch(resetTimeVideo());
                                //     dispatch(
                                //         addTimeVideo({
                                //             id: currentVid._id,
                                //             time: currentTimeVid,
                                //         })
                                //     );
                                // }}
                            />
                            {/* <iframe src={currentVid.videoUrl} controls /> */}
                        </div>
                        <h1 className="title-vid">{currentVid.title}</h1>
                        <div className="detail-vid-wrapper">
                            <div className="vid-author">
                                {channel._id === currentUser._id ? (
                                    <Link to={`/profile/${channel._id}`}>
                                        <div className="avt-author">
                                            <img src={channel.avatar} />
                                        </div>
                                    </Link>
                                ) : (
                                    <Link to={`/channel/${channel._id}`}>
                                        <div className="avt-author">
                                            <img src={channel.avatar} />
                                        </div>
                                    </Link>
                                )}

                                <div className="author-info">
                                    <h3 className="author-name">
                                        {channel.username}
                                    </h3>
                                    <span className="author-subscribed">
                                        {channel.subscribers}{" "}
                                        {t("video.Subscribers")}
                                    </span>
                                </div>
                            </div>
                            <div className="vid-controll">
                                {currentUser._id !== currentVid.userId ? (
                                    <button
                                        className="subscribe-btn"
                                        onClick={handleSub}
                                    >
                                        {currentUser.subscribedUsers?.includes(
                                            channel._id
                                        )
                                            ? t("video.Subscribed")
                                            : t("video.Subscribe")}
                                    </button>
                                ) : null}

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
                                    {t("video.Dislike")}
                                </div>
                                <div
                                    className="btn-vid-control share-btn"
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    <ReplyIcon />
                                    {t("video.Share")}
                                    {isOpen && (
                                        <div className="share-option">
                                            <FacebookShareButton
                                                url={currentVideo.videoUrl}
                                            >
                                                <FacebookIcon className="icon-share" />
                                            </FacebookShareButton>
                                            <TwitterShareButton
                                                url={currentVideo.videoUrl}
                                            >
                                                <TwitterIcon className="icon-share" />
                                            </TwitterShareButton>
                                            <FacebookMessengerShareButton
                                                url={currentVideo.videoUrl}
                                            >
                                                <FacebookMessengerIcon className="icon-share" />
                                            </FacebookMessengerShareButton>
                                        </div>
                                    )}
                                </div>
                                <div className="btn-vid-control download-btn">
                                    <DownloadIcon />
                                    {t("video.Download")}
                                </div>
                            </div>
                        </div>
                        <div className="vid-description">
                            <div className="vid-interact">
                                <span className="video-view">
                                    {currentVid.views > 1
                                        ? currentVid.views +
                                          " " +
                                          t("video.views")
                                        : currentVid.views +
                                          " " +
                                          t("video.view")}
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
                            <h3 className="box-comment-title">
                                {t("comment.Comments")}
                            </h3>
                            <Comments videoId={path} />
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
