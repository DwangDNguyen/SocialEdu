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
import InfiniteScroll from "react-infinite-scroll-component";

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const currentUser = useSelector((state) => state.user.user);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const { t } = useTranslation("blog");
    useEffect(() => {
        const fetchPost = async () => {
            const res = await post.get("/posts?page=" + currentPage);
            setBlogs((prevPosts) => [...prevPosts, ...res.data]);
            setLoading(false);
        };
        fetchPost();
    }, [currentUser._id, currentPage]);
    console.log(blogs);
    const fetchMoreData = () => {
        if (blogs.length < 18) {
            setCurrentPage((prevPage) => prevPage + 1);
        } else {
            setHasMore(false);
        }
    };
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
                    <InfiniteScroll
                        dataLength={blogs.length}
                        next={fetchMoreData}
                        hasMore={hasMore}
                        loader={
                            <div className="loading">
                                <ReactLoading type="bubbles" color="#a12727" />
                            </div>
                        }
                    >
                        <div className="list-blog">
                            {blogs?.map((blog) => (
                                <Blog key={blog._id} blog={blog} />
                            ))}
                        </div>
                    </InfiniteScroll>
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
