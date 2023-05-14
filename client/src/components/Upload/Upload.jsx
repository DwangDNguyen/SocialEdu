import React, { useState } from "react";
import "./upload.scss";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { video } from "../../redux/axios/axios";
import { useSelector } from "react-redux";
const Upload = ({ setOpen }) => {
    const [videoUrl, setVideoUrl] = useState(null);
    const [ImgUrl, setImgUrl] = useState(null);
    const [inputs, setInputs] = useState({});
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.user.user);
    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
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
        console.log({ ...inputs, tags, videoUrl, ImgUrl });

        const res = await video.post("/", {
            ...inputs,
            tags,
            ImgUrl,
        });
        if (window.location.pathname === `/profile/${currentUser._id}`) {
            res.status === 200 && window.location.reload() && setOpen(false);
        } else {
            res.status === 200 &&
                navigate(`/profile/${currentUser._id}`) &&
                setOpen(false);
        }
    };
    return (
        <div className="upload">
            <div className="upload-container">
                <div className="close-upload">
                    <CloseIcon onClick={() => setOpen(false)} />
                </div>
                <h1>Upload a New Video</h1>
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
                />
                <input
                    type="text"
                    placeholder="Title"
                    name="title"
                    onChange={handleChange}
                />
                <textarea
                    placeholder="Description"
                    name="description"
                    rows={8}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Separate the tags with commas"
                    onChange={handleTags}
                    name="tags"
                />
                <label>Image:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={onUpload}
                    name="ImgUrl"
                />
                <button onClick={handleUpload}>Upload</button>
            </div>
        </div>
    );
};

export default Upload;
