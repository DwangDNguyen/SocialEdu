/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import "./upload.scss";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { video } from "../../redux/axios/axios";
import { useSelector } from "react-redux";
const Upload = ({ setOpen, type, videoCurrent }) => {
    const [videoUrl, setVideoUrl] = useState(null);
    const [ImgUrl, setImgUrl] = useState(
        type === "upload" ? null : videoCurrent.ImgUrl
    );
    const [inputs, setInputs] = useState(
        type === "upload"
            ? {}
            : {
                  title: videoCurrent.title,
                  description: videoCurrent.description,
                  videoUrl: videoCurrent.videoUrl,
              }
    );
    const [tags, setTags] = useState(
        type === "upload" ? [] : videoCurrent.tags
    );
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.user.user);
    const handleChange = (e) => {
        if (type === "upload") {
            setInputs((prev) => {
                return { ...prev, [e.target.name]: e.target.value };
            });
        } else {
            setInputs({ ...inputs, [e.target.name]: e.target.value });
        }
        // setInputs((prev) => {
        //     return { ...prev, [e.target.name]: e.target.value };
        // });
    };
    function convert(file) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    }
    const handleTags = (e) => {
        setTags(e.target.value.split(","));
    };
    const onUpload = async (e) => {
        const base64 = await convert(e.target.files[0]);
        setImgUrl(base64);
    };
    // const onUploadVid = async (e) => {
    //     const base64Vid = await convert(e.target.files[0]);
    //     setVideoUrl(base64Vid);
    // };

    const handleUpload = async (e) => {
        e.preventDefault();
        // const img = ImgUrl.name;
        console.log({ ...inputs, tags, ImgUrl });

        if (type === "upload") {
            const res = await video.post("/", {
                ...inputs,
                tags,
                ImgUrl,
            });

            if (window.location.pathname === `/profile/${currentUser._id}`) {
                res.status === 200 &&
                    window.location.reload() &&
                    setOpen(false);
            } else {
                res.status === 200 &&
                    navigate(`/profile/${currentUser._id}`) &&
                    setOpen(false);
            }
        } else if (type === "update") {
            console.log(type);
            await video.put(`/update/${videoCurrent._id}`, {
                ...inputs,
                tags,
                ImgUrl,
            });
            window.location.reload() && setOpen(false);
        }
    };
    console.log(inputs);
    return (
        <div className="upload">
            <div className="upload-container">
                <div className="close-upload">
                    <CloseIcon onClick={() => setOpen(false)} />
                </div>
                <h1>
                    {type === "upload"
                        ? "Upload a New Video"
                        : "Update a Video"}
                </h1>
                <label>Video:</label>
                {/* <input
                    type="file"
                    accept="video/*"
                    onChange={onUploadVid}
                    name="videoUrl"
                />
                <label>Or</label> */}
                <input
                    type="text"
                    placeholder="videoUrl"
                    name="videoUrl"
                    onChange={handleChange}
                    value={inputs?.videoUrl}
                />
                <input
                    type="text"
                    placeholder="Title"
                    name="title"
                    onChange={handleChange}
                    value={inputs?.title}
                />
                <textarea
                    placeholder="Description"
                    name="description"
                    rows={8}
                    onChange={handleChange}
                    value={inputs?.description}
                />
                <input
                    type="text"
                    placeholder="Separate the tags with commas"
                    onChange={handleTags}
                    name="tags"
                    value={tags}
                />
                <label>Image:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={onUpload}
                    name="ImgUrl"
                />
                <button onClick={handleUpload}>
                    {type === "upload" ? "Upload" : "Update"}
                </button>
            </div>
        </div>
    );
};

export default Upload;
