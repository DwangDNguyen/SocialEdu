/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import "./post.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { post, user } from "../../redux/axios/axios";
import { format } from "timeago.js";
import { useSelector } from "react-redux";
import ReactLoading from "react-loading";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Blog from "../../components/Blog/Blog";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
const Post = () => {
    const path = useLocation().pathname.split("/")[2];
    const [currentPost, setCurrentPost] = useState({});
    const [channel, setChannel] = useState({});
    const currentUser = useSelector((state) => state.user.user);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [suggestedPosts, setSuggestedPosts] = useState([]);
    const navigate = useNavigate();
    const deleteRef = useRef();
    const { t } = useTranslation("blog");
    useEffect(() => {
        const fetchPost = async () => {
            const res = await post.get(`/find/${path}`);
            const resChannel = await user.get(`/find/${res.data.userId}`);
            const resSuggestPosts = await post.get("/suggestedPosts");
            setSuggestedPosts(resSuggestPosts.data);
            setChannel(resChannel.data);
            setCurrentPost(res.data);
            setLoading(false);
        };
        fetchPost();
    }, [path]);
    useEffect(() => {
        deleteRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [openModal]);
    const handleDeletePost = async () => {
        try {
            await post.delete("/" + currentPost._id);
            setOpenModal(false);
            toast.success("Delete Post Successfully!!", {
                autoClose: 4500,
                onClose: () => {
                    // setTimeout(() => {
                    navigate("/blog");
                    // }, 5000);
                },
                theme: "dark",
            });
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            {loading ? (
                <div className="loading">
                    <ReactLoading type="spokes" color="#a12727" />
                </div>
            ) : (
                <div className="post">
                    <ToastContainer
                        reverseOrder={false}
                        position="top-center"
                    />
                    <div className="post-img">
                        <img src={currentPost.image} />
                    </div>
                    <div className="separate"></div>
                    <div className="post-container">
                        <div className="post-title">
                            <h1>{currentPost.title}</h1>
                            {currentPost.userId === currentUser._id ||
                            currentUser.isAdmin ? (
                                <div className="handle-post">
                                    <EditIcon
                                        className="icon post-icon post-icon-edit"
                                        onClick={() =>
                                            navigate(
                                                `/blog/edit/${currentPost._id}`
                                            )
                                        }
                                    />
                                    <DeleteIcon
                                        className="icon post-icon post-icon-delete"
                                        onClick={() => setOpenModal(true)}
                                    />
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
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
                        <div className="separate"></div>
                        <h3>{t("post.Suggest some posts for you")}</h3>
                        <div className="list-suggest-post">
                            {suggestedPosts?.map((post, index) => (
                                <Blog key={index} blog={post} />
                            ))}
                        </div>
                    </div>
                    {openModal && (
                        <div className="modal-delete-post">
                            <div ref={deleteRef} className="modal-content-post">
                                <div className="modal-title-post">
                                    <h2>{t("delete blog.Delete post")}</h2>
                                </div>
                                <div className="modal-body-post">
                                    <p>
                                        {t(
                                            "delete blog.Are you sure you want to delete this post?"
                                        )}
                                    </p>
                                </div>
                                <div className="modal-footer-post">
                                    <button
                                        className="btn-del btn-del-cancel-post"
                                        onClick={() => setOpenModal(false)}
                                    >
                                        {t("delete blog.Cancel")}
                                    </button>
                                    <button
                                        className="btn-del btn-del-delete-post"
                                        onClick={handleDeletePost}
                                    >
                                        {t("delete blog.Delete")}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default Post;
