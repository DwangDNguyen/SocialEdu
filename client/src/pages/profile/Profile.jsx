/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import "./profile.scss";
import ReactLoading from "react-loading";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import DeleteIcon from "@mui/icons-material/Delete";
import ReadMoreIcon from "@mui/icons-material/ReadMore";

import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import { useSelector } from "react-redux";
import ListVideos from "../../components/ListVideos/ListVideos";
import CardProfile from "../../components/CardProfile/CardProfile";
import { video } from "../../redux/axios/axios";
import { useDispatch } from "react-redux";
import { format } from "timeago.js";

const Profile = () => {
    const currentUser = useSelector((state) => state.user.user);
    const [listVid, setListVid] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const tabs = ["Video", "Playlist"];
    const [tabSelected, setTabSelected] = useState(0);
    const [isPlaylist, setIsPlayList] = useState(false);
    const [listVidPlaylist, setListVidPlaylist] = useState([]);

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
            const resListVid = await video.get("/findUser/" + currentUser._id);
            // console.log(resListVid);
            setListVid(resListVid.data);
            // dispatch(showVideos(currentUser._id));
            setIsLoading(false);
        };
        fetchData();
    }, [currentUser._id]);
    const handleDeleteVid = async (value) => {
        const res = await video.delete(`/video/${value}`);
        setListVid(listVid.filter((vid) => vid._id !== res.data._id));
        setOpenModal(false);
        window.location.reload();
    };

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

    return (
        <div className="profile">
            {/* <Sidebar />
            <div className="container">
                <Navbar /> */}
            <div className="profile-content">
                <div className="profile-content-top">
                    <div className="single-avatar">
                        <img
                            src={
                                currentUser.avatar ||
                                "https://thumbs.dreamstime.com/b/test-icon-vector-question-mark-female-user-person-profile-avatar-symbol-help-sign-glyph-pictogram-illustration-test-168789128.jpg"
                            }
                        />
                    </div>
                    <div className="single-info">
                        <h1>{currentUser.username}</h1>
                        <div className="info-item">
                            <span className="info-title">Email:</span>
                            <span className="info-content">
                                {currentUser.email}
                            </span>
                        </div>
                        <div className="info-item">
                            <span className="info-title">Phone:</span>
                            <span className="info-content">
                                {currentUser.phone}
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
                    {/* <Link
                            to={`/update/${currentUser._id}`}
                            style={{ textDecoration: "none" }}
                        >
                            <div className="edit-btn">Edit</div>
                        </Link> */}
                </div>
                <div className="profile-content-bottom">
                    <div className="left">
                        <div className="option-profile">
                            {tabs.map((tab, index) => (
                                <span
                                    key={index}
                                    className={`title tab ${
                                        tabSelected === index ? "select" : ""
                                    }`}
                                    onClick={() => handleTabClick(index)}
                                >
                                    {tab}
                                </span>
                            ))}
                        </div>
                        {tabSelected === 0 && (
                            <div className="list-video profile-list-video">
                                {listVid?.map((video) => (
                                    // <div className="video-item">
                                    //     <Link to={`/video/${video._id}`}>
                                    //         <div className="img-vid">
                                    //             <img src={video.ImgUrl} />
                                    //         </div>
                                    //         <div className="video-content">
                                    //             <div className="avt-author">
                                    //                 <Link
                                    //                     to={`/profile/${currentUser._id}`}
                                    //                 >
                                    //                     <img
                                    //                         src={
                                    //                             currentUser.avatar
                                    //                         }
                                    //                     />
                                    //                 </Link>
                                    //             </div>
                                    //             <div className="video-info">
                                    //                 <h1 className="video-title">
                                    //                     {video.title}
                                    //                 </h1>
                                    //                 <span className="name-author">
                                    //                     {
                                    //                         currentUser.username
                                    //                     }
                                    //                 </span>
                                    //                 <div className="video-interact">
                                    //                     <span className="video-view">
                                    //                         {video.views}{" "}
                                    //                         views
                                    //                     </span>
                                    //                     <FiberManualRecordIcon className="icon-dot" />
                                    //                     <span className="video-time-upload">
                                    //                         {format(
                                    //                             video.createdAt
                                    //                         )}
                                    //                     </span>
                                    //                 </div>
                                    //             </div>
                                    //         </div>
                                    //     </Link>

                                    //     <DeleteIcon
                                    //         className="icon-delete"
                                    //         onClick={() =>
                                    //             setOpenModal(true)
                                    //         }
                                    //     />
                                    // </div>
                                    <CardProfile
                                        video={video}
                                        currentUser={currentUser}
                                        handleDeleteVid={handleDeleteVid}
                                        setOpenModal={setOpenModal}
                                        openModal={openModal}
                                    />
                                ))}
                            </div>
                        )}
                        {tabSelected === 1 && isPlaylist === false && (
                            <div className="list-video profile-playlist">
                                {playlist.map((playlist, index) => (
                                    <div
                                        className="listVid"
                                        key={index}
                                        onClick={() =>
                                            getPlaylist(String(playlist.tags))
                                        }
                                    >
                                        <div className="img-playlist">
                                            <div className="img-list">
                                                <img src={playlist.ImgUrl} />
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
                            <div className="list-video profile-list-video">
                                {listVidPlaylist?.map((video) => (
                                    // <div className="video-item">
                                    //     <Link to={`/video/${video._id}`}>
                                    //         <div className="img-vid">
                                    //             <img src={video.ImgUrl} />
                                    //         </div>
                                    //         <div className="video-content">
                                    //             <div className="avt-author">
                                    //                 <Link
                                    //                     to={`/profile/${currentUser._id}`}
                                    //                 >
                                    //                     <img
                                    //                         src={
                                    //                             currentUser.avatar
                                    //                         }
                                    //                     />
                                    //                 </Link>
                                    //             </div>
                                    //             <div className="video-info">
                                    //                 <h1 className="video-title">
                                    //                     {video.title}
                                    //                 </h1>
                                    //                 <span className="name-author">
                                    //                     {
                                    //                         currentUser.username
                                    //                     }
                                    //                 </span>
                                    //                 <div className="video-interact">
                                    //                     <span className="video-view">
                                    //                         {video.views}{" "}
                                    //                         views
                                    //                     </span>
                                    //                     <FiberManualRecordIcon className="icon-dot" />
                                    //                     <span className="video-time-upload">
                                    //                         {format(
                                    //                             video.createdAt
                                    //                         )}
                                    //                     </span>
                                    //                 </div>
                                    //             </div>
                                    //         </div>
                                    //     </Link>
                                    //     <DeleteIcon
                                    //         className="icon-delete"
                                    //         onClick={() =>
                                    //             setOpenModal(true)
                                    //         }
                                    //     />
                                    // </div>
                                    <CardProfile
                                        video={video}
                                        currentUser={currentUser}
                                        handleDeleteVid={handleDeleteVid}
                                        setOpenModal={setOpenModal}
                                        openModal={openModal}
                                    />
                                ))}
                            </div>
                        )}
                        {/* {isLoading ? (
                                <div className="loading">
                                    <ReactLoading
                                        type="spokes"
                                        color="#a12727"
                                    />
                                </div>
                            ) : (
                                <div className="list-video my-list-video">
                                    {listVid.map((item, index) => (
                                        <CardColumn
                                            video={item}
                                            currentUser={currentUser}
                                            handleDeleteVid={handleDeleteVid}
                                            setOpenModal={setOpenModal}
                                            openModal={openModal}
                                        />
                                    ))}
                                </div>
                            )} */}
                    </div>
                    {/* <div className="right">
                            <span className="title">Watch history</span>
                            <div className="list-video list-watch-history">
                                <CardColumn />
                                <CardColumn />
                                <CardColumn />
                                <CardColumn />
                            </div>
                        </div> */}
                </div>
            </div>
            {/* {openModal && (
                    <div className="modal-delete">
                        <div className="modal-content">
                            <div className="modal-title">
                                <h2>Delete video</h2>
                            </div>
                            <div className="modal-body">
                                <p>
                                    Are you sure you want to delete this video?
                                </p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn-del btn-del-cancel"
                                    onClick={() => setOpenModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn-del btn-del-delete"
                                    // onClick={() => handleDeleteVid(video._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )} */}
            {/* </div> */}
        </div>
    );
};

export default Profile;
