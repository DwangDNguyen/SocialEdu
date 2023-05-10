/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import "./message.scss";
import { format } from "timeago.js";
import { user } from "../../redux/axios/axios";

const Message = ({ own, message, userChat }) => {
    // const [userChat, setUserChat] = useState({});

    // useEffect(() => {
    //     const getUser = async () => {
    //         const res = await user.get("/find/" + message.sender);
    //         setUserChat(res.data);
    //     };
    //     getUser();
    // }, [message.sender, userChat]);
    // console.log(userChat);
    return (
        <div className={own ? "message own" : "message"}>
            <div className="message-top">
                <img src={userChat.avatar} />
                <span>{message.text}</span>
            </div>
            <div className="message-bottom">{format(message.createdAt)}</div>
        </div>
    );
};

export default Message;
