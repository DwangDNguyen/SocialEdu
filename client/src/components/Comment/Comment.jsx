/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import "./comment.scss";
import { user } from "../../redux/axios/axios";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import ClearIcon from "@mui/icons-material/Clear";
import { deleteComment } from "../../redux/actions/commentsAction";
import { format } from "timeago.js";
const Comment = ({ comment, handleDeleteCmt }) => {
    const [channel, setChannel] = useState({});
    const currentUser = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
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
            {comment.userId === currentUser._id ? (
                <div className="option-comment">
                    <ClearIcon
                        className="option-comment-icon"
                        onClick={deleteCmt}
                    />
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default Comment;
