/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useRef } from "react";
import "./navbar.scss";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import MessageIcon from "@mui/icons-material/Message";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/AuthContext";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Upload from "../Upload/Upload";
import { io } from "socket.io-client";

const Navbar = ({ socket }) => {
    const { dispatch, darkMode } = useContext(DarkModeContext);
    // const { currentUser, dispatchUser } = useContext(AuthContext);
    const currentUser = useSelector((state) => state.user.user);
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [openNotifications, setOpenNotifications] = useState(false);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        socket.current?.on("getNotification", (data) => {
            setNotifications((prev) => [...prev, data]);
        });
    }, [socket]);
    // console.log(socket);
    console.log(notifications);
    const handleChangeSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    };
    const submitSearch = () => {
        navigate(`/search?q=${encodeURIComponent(search)}`);
        window.location.reload();
    };
    const displayNotifications = ({ senderName, avatarImg, type }) => {
        let action;
        if (type === 1) {
            action = "liked";
        } else if (type === 2) {
            action = "disliked";
        }
        return (
            <div className="notification-item">
                <img src={avatarImg} />
                <div className="notification-content">
                    <span>{`${senderName} ${action} your video.`}</span>
                </div>
            </div>
        );
    };
    return (
        <>
            <div className="navbar">
                <div className="wrapper">
                    <div className="search">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search..."
                            value={search}
                            onChange={handleChangeSearch}
                        />
                        <div className="search-button" onClick={submitSearch}>
                            <SearchIcon />
                        </div>
                    </div>
                    <div className="navbar-items">
                        <div className="navbar-item language">
                            <LanguageIcon className="icon" />
                            <span>English</span>
                        </div>
                        <div className="navbar-item mode">
                            {darkMode ? (
                                <LightModeIcon
                                    className="icon"
                                    onClick={() => dispatch({ type: "TOGGLE" })}
                                />
                            ) : (
                                <DarkModeIcon
                                    className="icon"
                                    onClick={() => dispatch({ type: "TOGGLE" })}
                                />
                            )}
                        </div>
                        {currentUser ? (
                            <>
                                <div className="navbar-item notify">
                                    <CircleNotificationsIcon
                                        className="icon"
                                        onClick={() =>
                                            setOpenNotifications(
                                                !openNotifications
                                            )
                                        }
                                    />
                                    {notifications && (
                                        <div className="amount">
                                            {notifications.length}
                                        </div>
                                    )}
                                </div>
                                <Link to={`/chat`}>
                                    <div className="navbar-item mess">
                                        <MessageIcon className="icon" />
                                        <div className="amount">1</div>
                                    </div>
                                </Link>
                                <div className="navbar-item upload-icon">
                                    <VideoCallIcon
                                        className="icon icon-upload"
                                        onClick={() => setOpen(true)}
                                    />
                                </div>
                                <div className="navbar-item avatar-user">
                                    <Link to={`/profile/${currentUser._id}`}>
                                        <img
                                            src={
                                                currentUser.avatar ||
                                                "https://thumbs.dreamstime.com/b/test-icon-vector-question-mark-female-user-person-profile-avatar-symbol-help-sign-glyph-pictogram-illustration-test-168789128.jpg"
                                            }
                                            className="avatar"
                                        />
                                    </Link>
                                </div>{" "}
                            </>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
                {openNotifications && (
                    <div className="notifications">
                        <div className="notifications-list">
                            <h1>Notifications</h1>
                            {notifications.map((n, index) =>
                                displayNotifications(n)
                            )}
                            {/* <div className="notification-item">
                                <img src="https://img.freepik.com/free-icon/user_318-159711.jpg" />
                                <div className="notification-content">
                                    <span>Notification content</span>
                                </div>
                            </div>
                            <div className="notification-item">
                                <img src="https://img.freepik.com/free-icon/user_318-159711.jpg" />
                                <div className="notification-content">
                                    <span>Notification content</span>
                                </div>
                            </div>
                            <div className="notification-item">
                                <img src="https://img.freepik.com/free-icon/user_318-159711.jpg" />
                                <div className="notification-content">
                                    <span>Notification content</span>
                                </div>
                            </div> */}
                        </div>
                    </div>
                )}
            </div>
            <hr />

            {open && <Upload setOpen={setOpen} />}
        </>
    );
};

export default Navbar;
