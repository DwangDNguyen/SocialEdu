/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import "./cardColumnRandom.scss";
import { Link } from "react-router-dom";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { user } from "../../redux/axios/axios";
import { format } from "timeago.js";
const CardColumnRandom = ({ video }) => {
    const [channel, setChannel] = useState({});
    // console.log(video);
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
                <div className="col-video-item">
                    <div className="col-img-vid">
                        <img src={video?.ImgUrl} />
                    </div>
                    <div className="col-video-content">
                        <h1 className="col-video-title">{video?.title}</h1>
                        <div className="col-video-info">
                            <div className="col-vid-info-author">
                                <span className="col-name-author">
                                    {channel.username}
                                </span>
                                <div className="col-video-interact">
                                    <span className="col-video-view">
                                        {video.views} views
                                    </span>
                                    <FiberManualRecordIcon className="col-icon-dot" />
                                    <span className="col-video-time-upload">
                                        {format(video.createdAt)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
};

export default CardColumnRandom;
