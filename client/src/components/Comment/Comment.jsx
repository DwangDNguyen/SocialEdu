/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import "./comment.scss";
import { user } from "../../redux/axios/axios";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch, useSelector } from "react-redux";
import ClearIcon from "@mui/icons-material/Clear";
import { deleteComment } from "../../redux/actions/commentsAction";
import { format } from "timeago.js";
const Comment = ({ comment, handleDeleteCmt, handleEditCmt }) => {
    const [channel, setChannel] = useState({});
    const currentUser = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const [openBlock, setOpenBlock] = useState(false);
    useEffect(() => {
        try {
            const fetchComment = async () => {
                const res = await user.get(`/find/${comment.userId}`);
                setChannel(res.data);
            };
            fetchComment();
        } catch (err) {
            console.log(err);
        }
    }, [comment.userId]);
    const deleteCmt = () => {
        handleDeleteCmt(comment._id);
    };
    const editCmt = () => {
        handleEditCmt(comment);
        console.log(comment);
    };
    return (
        <div className="comment">
            <div className="avt-user">
                <img src={channel.avatar} />
            </div>
            <div className="comment-info">
                <div className="comment-user-title">
                    <span className="comment-user-name">
                        {channel.username}
                    </span>
                    <span className="comment-user-time">
                        {format(comment.createdAt)}
                    </span>
                </div>
                <div className="comment-user-content">{comment.desc}</div>
            </div>
            {comment.userId === currentUser._id || currentUser?.isAdmin ? (
                <>
                    <div className="option-comment">
                        <MoreHorizIcon
                            className="option-comment-icon"
                            onClick={() => setOpenBlock(!openBlock)}
                        />
                    </div>
                    {openBlock && (
                        <div className="block-option">
                            <div
                                className="block-option-item delete"
                                onClick={deleteCmt}
                            >
                                Delete
                            </div>
                            <div
                                className="block-option-item edit"
                                onClick={editCmt}
                            >
                                Edit
                            </div>
                        </div>
                    )}
                </>
            ) : (
                ""
            )}
        </div>
    );
};

export default Comment;
