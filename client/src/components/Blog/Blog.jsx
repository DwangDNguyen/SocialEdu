import React, { useState, useEffect } from "react";
import "./blog.scss";
import { user } from "../../redux/axios/axios";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
    const [channel, setChannel] = useState({});
    const currentUser = useSelector((state) => state.user.user);

    useEffect(() => {
        const thisChannel = async () => {
            const res = await user.get(`/find/${blog.userId}`);
            setChannel(res.data);
        };
        thisChannel();
    }, [blog?.userId]);
    return (
        <Link to={`/blog/${blog._id}`}>
            <div className="blog-container-item">
                <div className="blog-container-item-img">
                    <img src={blog.image} />
                </div>
                <div className="blog-container-item-top">
                    <div className="blog-container-item-author">
                        <img className="author-blog" src={channel.avatar} />
                        <span>{channel.username}</span>
                    </div>
                    <div className="blog-container-item-date">
                        <span>{format(blog.createdAt)}</span>
                    </div>
                </div>

                <div className="blog-container-item-content">
                    <h2>{blog.title}</h2>
                    <div
                        className="blog-container-item-content-text"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    ></div>
                </div>
            </div>
        </Link>
    );
};

export default Blog;
