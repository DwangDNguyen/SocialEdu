/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useRef, useState } from "react";
import "./messenger.scss";
import Message from "../Message/Message";
import SendIcon from "@mui/icons-material/Send";
import ReactLoading from "react-loading";
import { user, message } from "../../redux/axios/axios";
import { io } from "socket.io-client";
// import { current } from "@reduxjs/toolkit";

const Messenger = ({
    messages,
    currentUser,
    currentChat,
    setMessages,
    socket,
    conversations,
}) => {
    const [userChat, setUserChat] = useState({});
    const [newMessage, setNewMessage] = useState("");
    const messageRef = useRef();
    // console.log(userChat);

    const handleAddNewMessage = async (e) => {
        e.preventDefault();
        const thisMessage = {
            text: newMessage,
            sender: currentUser._id,
            conversationId: currentChat._id,
        };
        const receiverId = currentChat.members.find(
            (member) => member !== currentUser._id
        );
        socket.current.emit("sendMessage", {
            senderId: currentUser._id,
            receiverId: receiverId,
            text: newMessage,
        });
        try {
            const res = await message.post("/", thisMessage);
            setMessages([...messages, res.data]);
            setNewMessage("");
        } catch (err) {
            console.log(err);
        }
        // console.log(messages);
    };
    console.log(currentChat);
    useEffect(() => {
        const getUser = async () => {
            const otherUser = currentChat.members.filter(
                (member) => member !== currentUser._id
            );

            // console.log(otherUser);
            const res = await user.get("/find/" + otherUser[0]);
            setUserChat(res.data);
        };
        getUser();
    }, [currentChat, currentUser._id, messages]);
    // console.log(userChat);
    useEffect(() => {
        messageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="messenger">
            <div className="messenger-header">
                <div className="avt-user-cur-chat">
                    <img src={userChat.avatar} />
                </div>
                <span>{userChat.username}</span>
            </div>
            <div className="messenger-content">
                {messages?.map((message, index) => (
                    <div ref={messageRef} key={index}>
                        <Message
                            message={message}
                            own={
                                message.sender === currentUser._id
                                    ? true
                                    : false
                            }
                            userChat={userChat}
                        />
                    </div>
                ))}
                {/* <Message own={true} />
                <Message />
                <Message />
                <Message />
                <Message own={true} />
                <Message own={true} /> */}
            </div>
            <div className="messenger-input">
                <input
                    type="text"
                    className="chat-input"
                    placeholder="Type a message"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button className="chat-submit" onClick={handleAddNewMessage}>
                    <SendIcon className="icon" />
                </button>
            </div>
        </div>
    );
};

export default Messenger;
