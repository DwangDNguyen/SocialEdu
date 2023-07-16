/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import "./conversation.scss";
import { useState } from "react";
import { user, message } from "../../redux/axios/axios";

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

        // const getMessage = async () => {
        //     const resMess = await message.get("/" + conversation._id);
        //     console.log(resMess.data);
        // };
        getUser();
        // getMessage();
    }, [currentUser, conversation]);

    return (
        <div className="conversation">
            <img src={chatUser.avatar} />
            <span>{chatUser.username}</span>
            {/* <p>{lastMessage?.text}</p> */}
        </div>
    );
};

export default Conversation;
