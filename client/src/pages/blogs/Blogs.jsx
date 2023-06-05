import React, { useState, useEffect } from "react";
import "./blogs.scss";
import Blog from "../../components/Blog/Blog";
import { post } from "../../redux/axios/axios";
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import { useTranslation } from "react-i18next";
const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const currentUser = useSelector((state) => state.user.user);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation("blog");
    useEffect(() => {
        const fetchPost = async () => {
            const res = await post.get("/");
            setBlogs(res.data);
            setLoading(false);
        };
        fetchPost();
    }, [currentUser._id]);
    console.log(blogs);
    return (
        <div className="blog">
            <span>{t("blog list.Learn new things and share knowledge")}</span>
            <h1>{t("blog list.Read the greates blog from experts")}</h1>
            <div className="blog-container">
                {loading ? (
                    <div className="loading">
                        <ReactLoading type="spokes" color="#a12727" />
                    </div>
                ) : (
                    <div className="list-blog">
                        {blogs?.map((blog) => (
                            <Blog key={blog._id} blog={blog} />
                        ))}
                    </div>
                )}
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
