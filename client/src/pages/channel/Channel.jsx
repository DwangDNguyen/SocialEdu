/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import "./channel.scss";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import ListVideos from "../../components/ListVideos/ListVideos";
import CardColumn from "../../components/CardProfile/CardProfile";
import Card from "../../components/Card/Card";
import { useLocation } from "react-router-dom";
import { user, video, conversation } from "../../redux/axios/axios";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { format } from "timeago.js";
import ReactLoading from "react-loading";
import { refreshChat } from "../../redux/reducers/userSlice";

const Channel = () => {
    const idChannel = useLocation().pathname.split("/")[2];
    const [channel, setChannel] = useState({});
    const [listVid, setListVid] = useState([]);
    const [listVidPlaylist, setListVidPlaylist] = useState([]);
    const tabs = ["Video", "Playlist"];
    const [tabSelected, setTabSelected] = useState(0);
    const [isPlaylist, setIsPlayList] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [listConversation, setListConversation] = useState([]);
    const currentUser = useSelector((state) => state.user.user);
    // const [haveConversation, setHaveConversation] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleTabClick = (index) => {
        setTabSelected(index);
        if (tabSelected === 1) {
            setIsPlayList(false);
            setListVidPlaylist([]);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const res = await user.get("/find/" + idChannel);
            const resListVid = await video.get("/findUser/" + idChannel);
            // console.log(resListVid);
            setListVid(resListVid.data);
            setChannel(res.data);
            setIsLoading(false);
        };
        fetchData();
    }, [idChannel]);

    const playlist = listVid.reduce((acc, cur) => {
        cur.tags.forEach((tag) => {
            const existingItem = acc.find((item) => item.tags === tag);
            if (existingItem) {
                existingItem.ImgUrl = cur.ImgUrl;
            } else {
                acc.push({ tags: tag, ImgUrl: cur.ImgUrl });
            }
        });
        return acc;
    }, []);

    const getPlaylist = async (value) => {
        // const res = await video.get(
        //     `/user/tags?tags=${value}?userId=${idChannel}`
        // );
        // setListVidPlaylist(res.data);
        listVid.map((listVid) => {
            if (listVid.tags.includes(value)) {
                listVidPlaylist.push(listVid);
            }
        });

        setIsPlayList(true);
    };
    useEffect(() => {
        const getConversations = async () => {
            try {
                // setLoading(true);
                const res = await conversation.get("/" + channel._id);
                setListConversation(res.data);
                // setTimeout(() => {
                //     setLoading(false);
                // }, 3000);
            } catch (err) {
                console.log(err);
            }
        };
        getConversations();
    }, [channel._id]);
    console.log(listConversation);

    const handleConversation = async (e) => {
        if (
            listConversation.every(
                (conversation) =>
                    !conversation.members.includes(currentUser._id)
            )
        ) {
            await conversation.post("/", {
                senderId: currentUser._id,
                receiverId: channel._id,
            });
            navigate(`/chat`);
            dispatch(refreshChat());
        }
    };

    return (
        <div className="channel">
            {/* <Sidebar />
            <div className="container">
                <Navbar /> */}
            {isLoading ? (
                <div className="loading">
                    <ReactLoading type="spokes" color="#a12727" />
                </div>
            ) : (
                <div className="channel-content">
                    <div className="channel-content-top">
                        <div className="channel-user">
                            <div className="single-avatar">
                                <img
                                    src={
                                        channel.avatar ||
                                        "https://thumbs.dreamstime.com/b/test-icon-vector-question-mark-female-user-person-profile-avatar-symbol-help-sign-glyph-pictogram-illustration-test-168789128.jpg"
                                    }
                                />
                            </div>
                            <div className="single-info">
                                <h1>{channel.username}</h1>
                                <div className="info-item">
                                    <span className="info-title">Email:</span>
                                    <span className="info-content">
                                        {channel.email}
                                    </span>
                                </div>
                                <div className="info-item">
                                    <span className="info-title">Phone:</span>
                                    <span className="info-content">
                                        {channel.phone}
                                    </span>
                                </div>
                                {/* <div className="info-item">
                                        <span className="info-title">Address:</span>
                                        <span className="info-content">
                                            {user.Address}
                                        </span>
                                    </div> */}
                                {/* <div className="info-item">
                                        <span className="info-title">Country:</span>
                                        <span className="info-content">
                                            {thisUser.country}
                                        </span>
                                    </div> */}
                            </div>
                        </div>
                        <div className="info-option">
                            <Link to={`/chat/${channel._id}`}>
                                <button
                                    className="chat-btn"
                                    onClick={handleConversation}
                                >
                                    Message
                                </button>
                            </Link>
                        </div>
                        {/* <Link
                            to={`/update/${currentUser._id}`}
                            style={{ textDecoration: "none" }}
                        >
                            <div className="edit-btn">Edit</div>
                        </Link> */}
                    </div>
                    <div className="channel-content-bottom">
                        <div className="left">
                            <div className="option-channel">
                                {tabs.map((tab, index) => (
                                    <span
                                        key={index}
                                        className={`title tab ${
                                            tabSelected === index
                                                ? "select"
                                                : ""
                                        }`}
                                        onClick={() => handleTabClick(index)}
                                    >
                                        {tab}
                                    </span>
                                ))}
                            </div>
                            {tabSelected === 0 && (
                                <div className="list-video channel-list-video">
                                    {listVid?.map((video, index) => (
                                        <Link
                                            to={`/video/${video._id}`}
                                            key={index}
                                        >
                                            <div className="video-item">
                                                <div className="img-vid">
                                                    <img src={video.ImgUrl} />
                                                </div>
                                                <div className="video-content">
                                                    <div className="avt-author">
                                                        <Link
                                                            to={`/channel/${channel._id}`}
                                                        >
                                                            <img
                                                                src={
                                                                    channel.avatar
                                                                }
                                                            />
                                                        </Link>
                                                    </div>
                                                    <div className="video-info">
                                                        <h1 className="video-title">
                                                            {video.title}
                                                        </h1>
                                                        <span className="name-author">
                                                            {channel.username}
                                                        </span>
                                                        <div className="video-interact">
                                                            <span className="video-view">
                                                                {video.views}{" "}
                                                                views
                                                            </span>
                                                            <FiberManualRecordIcon className="icon-dot" />
                                                            <span className="video-time-upload">
                                                                {format(
                                                                    video.createdAt
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                            {tabSelected === 1 && isPlaylist === false && (
                                <div className="list-video channel-playlist">
                                    {playlist.map((playlist, index) => (
                                        <div
                                            className="listVid"
                                            key={index}
                                            onClick={() =>
                                                getPlaylist(
                                                    String(playlist.tags)
                                                )
                                            }
                                        >
                                            <div className="img-playlist">
                                                <div className="img-list">
                                                    <img
                                                        src={playlist.ImgUrl}
                                                    />
                                                </div>
                                                <div className="overlay">
                                                    <ReadMoreIcon className="icon icon-playlist" />
                                                </div>
                                                <div className="overlay-item"></div>
                                            </div>
                                            <h1>#{playlist.tags}</h1>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {tabSelected === 1 && isPlaylist === true && (
                                <div className="list-video channel-list-video">
                                    {listVidPlaylist?.map((video, index) => (
                                        <Link
                                            to={`/video/${video._id}`}
                                            key={index}
                                        >
                                            <div className="video-item">
                                                <div className="img-vid">
                                                    <img src={video.ImgUrl} />
                                                </div>
                                                <div className="video-content">
                                                    <div className="avt-author">
                                                        <Link
                                                            to={`/channel/${channel._id}`}
                                                        >
                                                            <img
                                                                src={
                                                                    channel.avatar
                                                                }
                                                            />
                                                        </Link>
                                                    </div>
                                                    <div className="video-info">
                                                        <h1 className="video-title">
                                                            {video.title}
                                                        </h1>
                                                        <span className="name-author">
                                                            {channel.username}
                                                        </span>
                                                        <div className="video-interact">
                                                            <span className="video-view">
                                                                {video.views}{" "}
                                                                views
                                                            </span>
                                                            <FiberManualRecordIcon className="icon-dot" />
                                                            <span className="video-time-upload">
                                                                {format(
                                                                    video.createdAt
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {/* </div> */}
        </div>
    );
};

export default Channel;
