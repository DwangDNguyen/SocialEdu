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
import Filter from "bad-words";
import { ToastContainer, toast } from "react-toastify";

import { blacklist } from "../../blacklist";
const Comments = ({ videoId }) => {
    const currentUser = useSelector((state) => state.user.user);
    const [comments, setComments] = useState([]);
    const [blackList, setBlacklist] = useState([]);
    const [textComment, setTextComment] = useState({
        id: "",
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
            setTextComment({
                desc: value.desc,
                videoId: value.videoId,
                id: value._id,
            });
            setIsEditing(true);
        } catch (err) {
            console.log(err);
        }
    };
    const postComment = async (e) => {
        e.preventDefault();
        var filter = new Filter();
        filter.addWords(...blacklist);
        const { desc, videoId } = textComment;
        if (desc.trim() === "") return;
        const newComment = await dispatch(addComment({ ...textComment }));

        if (filter.isProfane(newComment.desc)) {
            toast.error("Your comment contains inappropriate words!");
        }
        newComment.desc = filter.clean(newComment.desc);

        setComments([...comments, newComment]);
        setTextComment({ desc: "", videoId: videoId });
        commentRef.current.scrollIntoView({ behavior: "smooth" });
    };

    const updateComment = async (e) => {
        e.preventDefault();
        const { id, desc, videoId } = textComment;
        if (desc.trim() === "") return;
        const thisCmt = await dispatch(editComment({ ...textComment }));
        console.log(thisCmt);

        setComments(
            comments.map((comment) => (comment._id === id ? thisCmt : comment))
        );
        setTextComment({ desc: "", videoId: videoId });
        setIsEditing(false);
    };
    return (
        <>
            <ToastContainer theme="dark" />
            <form onSubmit={!isEditing ? postComment : updateComment}>
                <div className="comments">
                    <div className="avt-user">
                        <img
                            src={
                                currentUser.avatar ||
                                "https://thumbs.dreamstime.com/b/test-icon-vector-question-mark-female-user-person-profile-avatar-symbol-help-sign-glyph-pictogram-illustration-test-168789128.jpg"
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
