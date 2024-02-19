/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import "./upload.scss";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { video } from "../../redux/axios/axios";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
const Upload = ({ setOpen, type, videoCurrent }) => {
    const [videoUrl, setVideoUrl] = useState(null);
    const [ImgUrl, setImgUrl] = useState(
        null
        // type === "upload" ? null : videoCurrent.ImgUrl
    );
    const [isLoading, setIsLoading] = useState(false);
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
    const checkFileExistence = async (publicId) => {
        try {
            let cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
            let apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/${publicId}`;
            const res = await axios.get(apiUrl);
            return res.data;
        } catch (error) {
            return null; // Trả về null nếu có lỗi hoặc nếu tệp không tồn tại
        }
    };
    const onUpload = async (type) => {
        const data = new FormData();
        const maxSize = 100 * 1024 * 1024;
        data.append("file", type === "image" ? ImgUrl : videoUrl);
        data.append(
            "upload_preset",
            type === "image" ? "images_preset" : "videos_preset"
        );

        try {
            let publicId = type === "image" ? ImgUrl : videoUrl;
            const fileExistenceInfo = await checkFileExistence(publicId);

            if (fileExistenceInfo) {
                // Tệp đã tồn tại, không cần tải lên lại
                const { secure_url } = fileExistenceInfo;
                console.log("File already exists:", secure_url);
                return secure_url;
            }
            // if (videoUrl.size < maxSize) {
            let cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
            let resourceType = type === "image" ? "image" : "video";
            let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;
            const res = await axios.post(api, data);
            const { secure_url } = res.data;
            console.log(secure_url);
            return secure_url;
            // } else {
            //     let cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
            //     if (type === "image") {
            //         let resourceType = "image";
            //         let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;
            //         const res = await axios.post(api, data);
            //         const { secure_url } = res.data;
            //         console.log(secure_url);
            //         return secure_url;
            //     }
            //     return videoUrl;
            // }
        } catch (error) {
            toast.error(error.response.data.message);
        }
        // const data = new FormData();
        // data.append("file", e.target.files[0]);
        // const base64 = await convert(e.target.files[0]);
        // setImgUrl(base64);
    };
    const onUploadVid = async (e) => {
        const base64Vid = await convert(e.target.files[0]);
        setInputs({ ...inputs, videoUrl: base64Vid });
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        // const img = ImgUrl.name;
        console.log({ ...inputs, tags, ImgUrl });
        setIsLoading(true);
        const imgUrl = await onUpload("image");
        const vidUrl = await onUpload("video");
        if (type === "upload") {
            try {
                const res = await video.post("/", {
                    ...inputs,
                    tags,
                    // ImgUrl,
                    ImgUrl: imgUrl,
                    videoUrl: vidUrl,
                });

                if (
                    window.location.pathname === `/profile/${currentUser._id}`
                ) {
                    res.status === 200 &&
                        window.location.reload() &&
                        setOpen(false);
                } else {
                    res.status === 200 &&
                        toast.success("Video Uploaded Successfully!!", {
                            autoClose: 3000,
                            theme: "dark",
                        }) &&
                        navigate(`/profile/${currentUser._id}`) &&
                        setOpen(false);
                    setIsLoading(false);
                }
                setOpen(false);
                setIsLoading(false);
            } catch (err) {
                toast.error(
                    "Video Upload Failed! Please check your information",
                    {
                        autoClose: 3000,
                        theme: "dark",
                    }
                );
                setIsLoading(false);
            }
        } else if (type === "update") {
            try {
                await video.put(`/update/${videoCurrent._id}`, {
                    ...inputs,
                    tags,
                    ImgUrl: imgUrl,
                    videoUrl: vidUrl,
                });
                toast.success("Video Updated Successfully!!", {
                    autoClose: 3000,
                    onClose: () => {
                        window.location.reload() && setOpen(false);
                    },
                    theme: "dark",
                });
                setIsLoading(false);
            } catch (err) {
                toast.error("Video Update Failed", {
                    autoClose: 3000,
                    theme: "dark",
                });
            }
        }
        // setOpen(false);
    };
    console.log(inputs);
    return (
        <div className="upload">
            <ToastContainer position="top-center" />
            <div className="upload-container">
                <div className="close-upload">
                    <CloseIcon onClick={() => setOpen(false)} />
                </div>
                <h1>
                    {type === "upload"
                        ? "Upload a New Video"
                        : "Update a Video"}
                </h1>
                <form onSubmit={handleUpload}>
                    <label>Video:</label>
                    <input
                        type="file"
                        accept="video/*"
                        // onChange={onUploadVid}
                        onChange={(e) => setVideoUrl(e.target.files[0])}
                        name="videoUrl"
                    />
                    <label>Or</label>
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
                        // onChange={onUpload}
                        onChange={(e) => setImgUrl(e.target.files[0])}
                        name="ImgUrl"
                    />
                    <button type="submit">
                        {isLoading
                            ? "Loading..."
                            : type === "upload"
                            ? "Upload"
                            : "Update"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Upload;
