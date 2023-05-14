import React, { useState, useEffect } from "react";
import "./blogs.scss";
import Blog from "../../components/Blog/Blog";
import { post } from "../../redux/axios/axios";
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Link } from "react-router-dom";
const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const currentUser = useSelector((state) => state.user.user);
    useEffect(() => {
        const fetchPost = async () => {
            const res = await post.get("/");
            setBlogs(res.data);
        };
        fetchPost();
    }, [currentUser._id]);
    console.log(blogs);
    return (
        <div className="blog">
            <span>Learn new things and share knowledge</span>
            <h1>Read the greates blog from experts</h1>
            <div className="blog-container">
                {blogs?.map((blog) => (
                    <Blog key={blog._id} blog={blog} />
                ))}
            </div>
            <Link to="/blog/new">
                <div className="create-blog-btn">
                    <AddBoxIcon className="icon" />
                </div>
            </Link>
        </div>
    );
};

export default Blogs;
