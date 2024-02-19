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
import MenuIcon from "@mui/icons-material/Menu";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/AuthContext";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Upload from "../Upload/Upload";
import { io } from "socket.io-client";
import Sidebar from "../Sidebar/Sidebar";
import { useTranslation } from "react-i18next";
import { locales } from "../../i18n";
// import { notification } from "../../redux/axios/axios";
import { format } from "timeago.js";
import Notify from "../notify/Notify";

const Navbar = ({ socket, search, handleChangeSearch, submitSearch }) => {
    const { i18n, t } = useTranslation(["search", "home"]);
    const currentLanguage = locales[i18n.language];
    const { dispatch, darkMode } = useContext(DarkModeContext);
    // const { currentUser, dispatchUser } = useContext(AuthContext);
    const currentUser = useSelector((state) => state.user.user);
    const [open, setOpen] = useState(false);
    const [openSidebar, setOpenSidebar] = useState(false);
    // const [notifications, setNotifications] = useState([]);
    // const [openNotifications, setOpenNotifications] = useState(false);
    // const [search, setSearch] = useState("");
    const [openLanguage, setOpenLanguage] = useState(false);
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    // useEffect(() => {
    //     socket.current?.on("getNotification", (data) => {
    //         setNotifications((prev) => [...prev, data]);
    //     });
    // }, [socket]);
    // useEffect(() => {
    //     const fetchNotifications = async () => {
    //         const res = await notification.get(
    //             "/notifications/" + currentUser._id
    //         );
    //         setNotifications(res.data);
    //     };
    //     fetchNotifications();
    // }, [currentUser._id]);
    // console.log(socket);
    // console.log(notifications);
    // const handleChangeSearch = (e) => {
    //     e.preventDefault();
    //     setSearch(e.target.value);
    // };
    // const submitSearch = () => {
    //     navigate(`/search?q=${encodeURIComponent(search)}`);
    //     setSearch("");
    //     // window.location.reload();
    // };
    // const displayNotifications = ({ senderName, avatarImg, type }) => {
    //     let action;
    //     if (type === 1) {
    //         action = "liked";
    //     } else if (type === 2) {
    //         action = "disliked";
    //     }
    //     return (
    //         <div className="notification-item">
    //             <img src={avatarImg} />
    //             <div className="notification-content">
    //                 <span>{`${senderName} ${action} your video.`}</span>
    //             </div>
    //         </div>
    //     );
    // };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <>
            <div className="navbar">
                {openSidebar && (
                    <Sidebar
                        openSidebar={openSidebar}
                        setOpenSidebar={setOpenSidebar}
                    />
                )}
                <div className="wrapper">
                    <div className="menu-icon-res">
                        <MenuIcon
                            className="icon"
                            onClick={() => {
                                setOpenSidebar(true);
                            }}
                        />
                    </div>
                    <div className="search">
                        <input
                            type="text"
                            className="search-input"
                            placeholder={t("search input.Search...")}
                            value={search}
                            onChange={handleChangeSearch}
                        />
                        <div className="search-button" onClick={submitSearch}>
                            <SearchIcon />
                        </div>
                    </div>
                    <div className="navbar-items">
                        <div
                            className="navbar-item language"
                            onClick={() => setOpenLanguage(!openLanguage)}
                        >
                            <LanguageIcon className="icon" />
                            <span>{currentLanguage}</span>
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
                                {/* <div className="navbar-item notify">
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
                                </div> */}
                                <Link to={`/chat`}>
                                    <div className="navbar-item mess">
                                        <MessageIcon className="icon" />
                                        {/* <div className="amount">1</div> */}
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
                {/* {openNotifications && (
                    <div className="notifications">
                        <div className="notifications-list">
                            <h1>Notifications</h1>
                            {notifications.map((n, index) => (
                                <Notify n={n} key={index} />
                            ))}
                            
                        </div>
                    </div>
                )} */}
                {openLanguage && (
                    <div className="language-dropdown">
                        <div
                            className="language-option"
                            onClick={() => {
                                changeLanguage("en");
                                setOpenLanguage(false);
                            }}
                        >
                            English
                        </div>
                        <div
                            className="language-option"
                            onClick={() => {
                                changeLanguage("vi");
                                setOpenLanguage(false);
                            }}
                        >
                            Tiếng Việt
                        </div>
                    </div>
                )}
            </div>
            <hr />

            {open && <Upload setOpen={setOpen} type="upload" />}
        </>
    );
};

export default Navbar;
