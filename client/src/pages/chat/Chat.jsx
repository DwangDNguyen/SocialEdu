/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useRef } from "react";
import "./chat.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Conversation from "../../components/Conversation/Conversation";
import Messenger from "../../components/Messenger/Messenger";
import { useSelector } from "react-redux";
import { conversation, message } from "../../redux/axios/axios";
import ReactLoading from "react-loading";
import { io } from "socket.io-client";
import { useLocation, useNavigate } from "react-router-dom";

const Chat = () => {
    const [conversations, setConversations] = useState([]);
    const currentUser = useSelector((state) => state.user.user);
    const refresh = useSelector((state) => state.user.refresh);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingConversation, setLoadingConversation] = useState(true);
    // const [haveConversation, setHaveConversation] = useState(true);
    const [arrivalMessage, setArrivalMessage] = useState(null);

    const socket = useRef();

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        socket.current.emit("addUser", currentUser._id);
        socket.current.on("getUsers", (users) => {
            // console.log(users);
        });
    }, [currentUser, socket]);

    useEffect(() => {
        const getConversations = async () => {
            try {
                setLoadingConversation(true);

                const res = await conversation.get("/" + currentUser._id);
                // await conversation.delete("/");
                setConversations(res.data);

                setTimeout(() => {
                    setLoadingConversation(false);
                }, 3000);
            } catch (err) {
                console.log(err);
            }
        };
        getConversations();
    }, [currentUser._id, refresh]);

    // console.log(conversations);
    useEffect(() => {
        const getMessage = async () => {
            try {
                setLoading(true);
                const res = await message.get("/" + currentChat?._id);
                setMessages(res.data);
                setTimeout(() => {
                    setLoading(false);
                }, 3000);
            } catch (err) {
                console.log(err);
            }
        };
        getMessage();
    }, [currentChat]);
    // console.log(messages);

    // console.log(currentChat);
    return (
        <div className="chat">
            {/* <Sidebar />
            <div className="chat-container">
                <Navbar />
                <div className="chat-content"> */}
            {currentChat && loading === true ? (
                <div className="loading">
                    <ReactLoading type="spokes" color="#a12727" />
                </div>
            ) : currentChat === null ? (
                <div className="no-chat">
                    <div className="no-chat-block">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Line-style-icons-chat.svg/1280px-Line-style-icons-chat.svg.png" />
                        <span>Open a conversation to chat</span>
                    </div>
                </div>
            ) : (
                <div className="chat-message">
                    <Messenger
                        messages={messages}
                        currentUser={currentUser}
                        currentChat={currentChat}
                        setMessages={setMessages}
                        socket={socket}
                        conversations={conversations}
                    />
                </div>
            )}

            <div className="chat-conversation">
                {}
                {loadingConversation ? (
                    <ReactLoading type="spokes" color="#a12727" />
                ) : (
                    conversations.map((conversation, index) => (
                        <div
                            onClick={() => {
                                setCurrentChat(conversation);
                            }}
                            key={index}
                        >
                            <Conversation
                                conversation={conversation}
                                currentUser={currentUser}
                                currentChat={currentChat}
                            />
                        </div>
                    ))
                )}
            </div>
            {/* </div>
            </div> */}
        </div>
    );
};

export default Chat;
