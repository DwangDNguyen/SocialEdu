/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import "./conversation.scss";
import { useState } from "react";
import { user } from "../../redux/axios/axios";

const Conversation = ({ conversation, currentUser }) => {
    const [chatUser, setChatUser] = useState({});
    // console.log(conversation.members);
    useEffect(() => {
        const friendId = conversation?.members.find(
            (m) => m !== currentUser._id
        );
        const getUser = async () => {
            const res = await user.get("/find/" + friendId);
            setChatUser(res.data);
        };
        getUser();
    }, [currentUser, conversation]);
    // console.log(chatUser);
    return (
        <div className="conversation">
            <img src={chatUser.avatar} />
            <span>{chatUser.username}</span>
        </div>
    );
};

export default Conversation;
