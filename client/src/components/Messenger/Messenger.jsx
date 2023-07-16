/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useRef, useState } from "react";
import "./messenger.scss";
import Message from "../Message/Message";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ReactLoading from "react-loading";
import { user, message } from "../../redux/axios/axios";
import { io } from "socket.io-client";
import CryptoJS from "crypto-js";
import EmojiPicker, {
    EmojiStyle,
    SkinTones,
    Theme,
    Categories,
    EmojiClickData,
    Emoji,
    SuggestionMode,
    SkinTonePickerLocation,
} from "emoji-picker-react";
// import { current } from "@reduxjs/toolkit";
// const { publicKey, privateKey } = CryptoES.generateKeyPairSync("rsa", {
//     modulusLength: 2048,
//     publicKeyEncoding: {
//         type: "spki",
//         format: "pem",
//     },
//     privateKeyEncoding: {
//         type: "pkcs8",
//         format: "pem",
//     },
// });
// console.log("Public Key:", publicKey);
// console.log("Private Key:", privateKey);
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
    const [selectedEmoji, setSelectedEmoji] = useState("");
    const [openEmoji, setOpenEmoji] = useState(false);

    const handleAddNewMessage = async (e) => {
        e.preventDefault();
        let thisMessage = {
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
            const ENCRYPT_KEY = "fcTowm3oX869xj8gt8Rg56RgIRmtpbsg";

            const encryptedData = CryptoJS.AES.encrypt(
                JSON.stringify(thisMessage.text),
                ENCRYPT_KEY
            ).toString();
            thisMessage = {
                ...thisMessage,
                text: encryptedData,
            };
            const res = await message.post("/", thisMessage);

            const encryptedMessage = res.data.text;
            const bytes = CryptoJS.AES.decrypt(encryptedMessage, ENCRYPT_KEY);
            const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            // const bytes = CryptoJS.AES.decrypt(encryptedMessage, ENCRYPT_KEY);
            // const data = bytes.toString(CryptoJS.enc.Utf8);
            // console.log(data);
            res.data = {
                ...res.data,
                text: decryptedData,
            };
            console.log(encryptedMessage);
            setMessages([...messages, res.data]);
            setNewMessage("");
        } catch (err) {
            console.log(err);
        }
        // console.log(messages);
    };

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
    const onClick = (emojiObject, event) => {
        let message = newMessage;
        message += emojiObject.emoji;
        setNewMessage(message);
    };
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
                <EmojiEmotionsIcon
                    className="icon icon-emoji"
                    onClick={() => setOpenEmoji(!openEmoji)}
                />
                {openEmoji && (
                    <div className="emoji-box">
                        <EmojiPicker
                            onEmojiClick={onClick}
                            autoFocusSearch={false}
                            theme={Theme.DARK}
                        />
                    </div>
                )}

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
