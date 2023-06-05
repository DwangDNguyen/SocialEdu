/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect, useRef } from "react";
import "./comments.scss";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import Comment from "../Comment/Comment";
import { comment } from "../../redux/axios/axios";
import {
    addComment,
    deleteComment,
    editComment,
} from "../../redux/actions/commentsAction";
import { useTranslation } from "react-i18next";
const Comments = ({ videoId }) => {
    const currentUser = useSelector((state) => state.user.user);
    const [comments, setComments] = useState([]);
    const [textComment, setTextComment] = useState({
        desc: "",
        videoId: videoId,
    });
    const [isEditing, setIsEditing] = useState(false);
    const commentRef = useRef();
    const dispatch = useDispatch();
    const { t } = useTranslation("video");
    // console.log(videoId);
    useEffect(() => {
        const fetchComments = async () => {
            const res = await comment.get(`/${videoId}`);
            setComments(res.data);
        };
        fetchComments();
    }, [videoId]);

    const handleChange = (e) => {
        setTextComment({
            ...textComment,
            [e.target.name]: e.target.value,
        });
    };
    const handleDeleteCmt = async (value) => {
        try {
            const remainCmt = await dispatch(deleteComment(value));
            setComments(
                comments.filter((comment) => comment._id !== remainCmt)
            );
            console.log(remainCmt);
        } catch (err) {
            console.log(err);
        }
    };
    const handleEditCmt = async (value) => {
        try {
            setTextComment({ desc: value.desc, videoId: value.videoId });
            setIsEditing(true);
        } catch (err) {
            console.log(err);
        }
    };
    const postComment = async (e) => {
        e.preventDefault();
        const { desc, videoId } = textComment;
        if (desc.trim() === "") return;
        const newComment = await dispatch(addComment({ ...textComment }));
        setComments([...comments, newComment]);
        setTextComment({ desc: "", videoId: videoId });
        commentRef.current.scrollIntoView({ behavior: "smooth" });
    };

    const updateComment = async (e) => {
        e.preventDefault();
        const { desc, videoId } = textComment;
        if (desc.trim() === "") return;
        const thisCmt = await dispatch(editComment({ ...textComment }));
        setComments(
            comments.map((comment) =>
                comment._id === thisCmt._id ? thisCmt : comment
            )
        );
        setTextComment({ desc: "", videoId: videoId });
        setIsEditing(false);
    };
    return (
        <>
            <form onSubmit={!isEditing ? postComment : updateComment}>
                <div className="comments">
                    <div className="avt-user">
                        <img
                            src={
                                currentUser.avatar ||
                                "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                            }
                        />
                    </div>
                    <input
                        placeholder={t("comment.Add a comment...")}
                        value={textComment.desc}
                        onChange={handleChange}
                        name="desc"
                        autoComplete="off"
                    />
                    <button className="icon-post-comment">
                        <SendIcon />
                    </button>
                </div>
            </form>
            <div className="list-comment">
                {comments.map((comment, index) => (
                    <Comment
                        key={index}
                        comment={comment}
                        handleDeleteCmt={handleDeleteCmt}
                        handleEditCmt={handleEditCmt}
                    />
                ))}
            </div>
            <div ref={commentRef} />
        </>
    );
};

export default Comments;
