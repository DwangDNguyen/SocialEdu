import React, { useState, useEffect } from "react";
import "./postItems.scss";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { format } from "timeago.js";
import { user } from "../../redux/axios/axios";
import { Link } from "react-router-dom";

const PostItems = ({ postSearch }) => {
    const [channel, setChannel] = useState({});
    useEffect(() => {
        const thisChannel = async () => {
            const res = await user.get("/find/" + postSearch.userId);
            setChannel(res.data);
        };
        thisChannel();
    }, [postSearch.userId]);
    return (
        <Link to={`/blog/${postSearch._id}`}>
            <div className="search-post-item">
                <div className="search-img-vid">
                    <img src={postSearch.image} />
                </div>
                <div className="search-post-content">
                    <h1 className="search-post-title">{postSearch.title}</h1>
                    <div className="search-post-info">
                        <div className="search-post-interact">
                            {/* <span className="search-post-view">
                            {postSearch.views} views
                        </span>
                        <FiberManualRecordIcon className="search-icon-dot" /> */}
                            <span className="search-post-time-upload">
                                {format(postSearch.createdAt)}
                            </span>
                        </div>

                        <div className="search-vid-info-author">
                            <div className="search-post-channel-avatar">
                                <img src={channel.avatar} />
                            </div>
                            <span className="search-name-author">
                                {channel.username}
                            </span>
                        </div>
                    </div>
                    <div
                        className="search-post-desc"
                        dangerouslySetInnerHTML={{
                            __html: postSearch.content,
                        }}
                    ></div>
                </div>
            </div>
        </Link>
    );
};

export default PostItems;
