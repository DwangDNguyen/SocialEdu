/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import "./cardProfile.scss";
import { Link } from "react-router-dom";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
// import { user } from "../../redux/axios/axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { format } from "timeago.js";
import { useTranslation } from "react-i18next";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Upload from "../Upload/Upload";
const CardProfile = ({
    video,
    currentUser,
    handleDeleteVid,
    setOpenModal,
    openModal,
}) => {
    const { t } = useTranslation("setting");
    const [open, setOpen] = useState(false);
    const [openBlock, setOpenBlock] = useState(false);
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
                                    {/* <span className="col-name-author">
                                        {currentUser?.username}
                                    </span> */}
                                    <div className="col-video-interact">
                                        <span className="col-video-view">
                                            {video?.views} {t("profile.views")}
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
                <MoreVertIcon
                    className="icon-more"
                    onClick={() => setOpenBlock(!openBlock)}
                />
                {openBlock && (
                    <div className="block-option">
                        <div
                            className="block-option-item delete"
                            onClick={() => setOpenModal(true)}
                        >
                            Delete
                        </div>
                        <div
                            className="block-option-item edit"
                            onClick={() => {
                                setOpen(true);
                            }}
                        >
                            Edit
                        </div>
                    </div>
                )}
                {/* <DeleteIcon
                    className="icon-delete"
                    onClick={() => setOpenModal(true)}
                /> */}
            </div>
            {openModal && (
                <div className="modal-delete">
                    <div className="modal-content">
                        <div className="modal-title">
                            <h2>{t("delete video.Delete video")}</h2>
                        </div>
                        <div className="modal-body">
                            <p>
                                {t(
                                    "delete video.Are you sure you want to delete this video?"
                                )}
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button
                                className="btn-del btn-del-cancel"
                                onClick={() => setOpenModal(false)}
                            >
                                {t("delete video.Cancel")}
                            </button>
                            <button
                                className="btn-del btn-del-delete"
                                onClick={deleteVid}
                            >
                                {t("delete video.Delete")}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {open && (
                <Upload
                    open={open}
                    setOpen={setOpen}
                    type="update"
                    videoCurrent={video}
                />
            )}
        </>
    );
};

export default CardProfile;
