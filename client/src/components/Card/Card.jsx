/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import "./card.scss";
import { Link } from "react-router-dom";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { user } from "../../redux/axios/axios";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
const Card = ({ video }) => {
    const [channel, setChannel] = useState({});
    const currentUser = useSelector((state) => state.user.user);
    useEffect(() => {
        const thisChannel = async () => {
            const res = await user.get(`/find/${video.userId}`);
            setChannel(res.data);
        };
        thisChannel();
    }, [video?.userId]);

    return (
        <>
            <Link to={`/video/${video?._id}`}>
                <div className="video-item">
                    <div className="img-vid">
                        <img src={video?.ImgUrl} />
                    </div>
                    <div className="video-content">
                        <div className="avt-author">
                            {channel._id === currentUser._id ? (
                                <Link to={`/profile/${currentUser._id}`}>
                                    <img src={channel.avatar} />
                                </Link>
                            ) : (
                                <Link to={`/channel/${channel._id}`}>
                                    <img src={channel.avatar} />
                                </Link>
                            )}
                        </div>
                        <div className="video-info">
                            <h1 className="video-title">{video?.title}</h1>
                            {channel._id === currentUser._id ? (
                                <Link to={`/profile/${currentUser._id}`}>
                                    <span className="name-author">
                                        {channel.username}
                                    </span>
                                </Link>
                            ) : (
                                <Link to={`/channel/${channel._id}`}>
                                    <span className="name-author">
                                        {channel.username}
                                    </span>
                                </Link>
                            )}
                            <div className="video-interact">
                                <span className="video-view">
                                    {video.views} views
                                </span>
                                <FiberManualRecordIcon className="icon-dot" />
                                <span className="video-time-upload">
                                    {format(video.createdAt)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
};

export default Card;
