/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import "./post.scss";
import { useLocation } from "react-router-dom";
import { post, user } from "../../redux/axios/axios";
import { format } from "timeago.js";
import { useSelector } from "react-redux";
import ReactLoading from "react-loading";

const Post = () => {
    const path = useLocation().pathname.split("/")[2];
    const [currentPost, setCurrentPost] = useState({});
    const [channel, setChannel] = useState({});
    const currentUser = useSelector((state) => state.user.user);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchPost = async () => {
            const res = await post.get(`/find/${path}`);
            const resChannel = await user.get(`/find/${res.data.userId}`);
            setChannel(resChannel.data);
            setCurrentPost(res.data);
            setLoading(false);
        };
        fetchPost();
    }, [path]);
    return (
        <>
            {loading ? (
                <div className="loading">
                    <ReactLoading type="spokes" color="#a12727" />
                </div>
            ) : (
                <div className="post">
                    <div className="post-img">
                        <img src={currentPost.image} />
                    </div>
                    <div className="separate"></div>
                    <div className="post-container">
                        <h1>{currentPost.title}</h1>
                        <div className="post-top">
                            <div className="post-author">
                                <img src={channel.avatar} />
                                <span>{channel.username}</span>
                            </div>
                            <div className="post-date">
                                <span>{format(currentPost.createdAt)}</span>
                            </div>
                        </div>
                        <div
                            className="post-content"
                            dangerouslySetInnerHTML={{
                                __html: currentPost.content,
                            }}
                        ></div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Post;
