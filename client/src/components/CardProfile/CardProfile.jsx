/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import "./cardProfile.scss";
import { Link } from "react-router-dom";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
// import { user } from "../../redux/axios/axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { format } from "timeago.js";
const CardProfile = ({
    video,
    currentUser,
    handleDeleteVid,
    setOpenModal,
    openModal,
}) => {
    const deleteVid = () => {
        handleDeleteVid(video._id);
        // console.log(video);
    };
    return (
        <>
            <div className="col-video-item">
                <Link to={`/video/${video?._id}`}>
                    <div className="video-item-col">
                        <div className="col-img-vid">
                            <img src={video?.ImgUrl} />
                        </div>
                        <div className="col-video-content">
                            <h1 className="col-video-title">{video?.title}</h1>
                            <div className="col-video-info">
                                <div className="col-vid-info-author">
                                    <span className="col-name-author">
                                        {currentUser?.username}
                                    </span>
                                    <div className="col-video-interact">
                                        <span className="col-video-view">
                                            {video?.views} views
                                        </span>
                                        <FiberManualRecordIcon className="col-icon-dot" />
                                        <span className="col-video-time-upload">
                                            {format(video?.createdAt)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>

                <DeleteIcon
                    className="icon-delete"
                    onClick={() => setOpenModal(true)}
                />
            </div>
            {openModal && (
                <div className="modal-delete">
                    <div className="modal-content">
                        <div className="modal-title">
                            <h2>Delete video</h2>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete this video?</p>
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
                                onClick={deleteVid}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CardProfile;
