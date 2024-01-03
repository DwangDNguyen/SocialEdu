import React, { useState, useEffect } from "react";
import "./searchItems.scss";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { format } from "timeago.js";
import { user } from "../../redux/axios/axios";
import { useNavigate } from "react-router-dom";

const SearchItems = ({ videoSearch, type }) => {
    const [channel, setChannel] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        const thisChannel = async () => {
            const res = await user.get("/find/" + videoSearch?.userId);
            setChannel(res.data);
        };
        thisChannel();
    }, [videoSearch?.userId]);
    return (
        <div
            className={
                type === "trending"
                    ? "search-video-item item-trending"
                    : "search-video-item"
            }
            onClick={() => navigate(`/video/${videoSearch._id}`)}
        >
            <div className="search-img-vid">
                <img src={videoSearch.ImgUrl} />
            </div>
            <div className="search-video-content">
                <h1 className="search-video-title">{videoSearch.title}</h1>
                <div className="search-video-info">
                    <div className="search-video-interact">
                        <span className="search-video-view">
                            {videoSearch.views} views
                        </span>
                        <FiberManualRecordIcon className="search-icon-dot" />
                        <span className="search-video-time-upload">
                            {format(videoSearch.createdAt)}
                        </span>
                    </div>

                    <div className="search-vid-info-author">
                        <div className="search-video-channel-avatar">
                            <img src={channel.avatar} />
                        </div>
                        <span className="search-name-author">
                            {channel.username}
                        </span>
                    </div>
                </div>
                <div className="search-video-desc">
                    {videoSearch.description}
                </div>
            </div>
        </div>
    );
};

export default SearchItems;
