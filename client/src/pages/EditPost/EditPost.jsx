import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./editPost.scss";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { post } from "../../redux/axios/axios";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";
const EditPost = () => {
    const { t } = useTranslation("blog");
    const [isLoading, setIsLoading] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [currentPost, setCurrentPost] = useState({});
    const path = useLocation().pathname.split("/")[3];
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const navigate = useNavigate();
    const editorConfig = {
        placeholder: "Enter text here...",
    };
    useEffect(() => {
        const fetchPost = async () => {
            const res = await post.get(`/find/${path}`);
            setCurrentPost(res.data);
            setTitle(res.data.title);
            setContent(res.data.content);
            // setImage(res.data.image);
        };
        fetchPost();
    }, [path]);
    // console.log(currentPost);

    // console.log(title);
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
    const onUpload = async (e) => {
        const base64 = await convert(e.target.files[0]);
        setImage(base64);
        setFormErrors({ ...formErrors, image: null });
    };
    const validate = (image, title, content) => {
        const error = {};
        if (!image) {
            error.image = "Please select an image";
        }
        if (!title) {
            error.title = "Please enter a title";
        }
        if (!content) {
            error.content = "Please enter a content";
        }
        return error;
    };
    const handleChange = (e) => {
        setTitle(e.target.value);
        setFormErrors({ ...formErrors, [e.target.name]: null });
    };
    const handleUpdatePost = async (e) => {
        e.preventDefault();
        setFormErrors(validate(image, title, content));
        // console.log({ image, title, content });
        try {
            setIsLoading(true);
            await post.put(`/update/${path}`, {
                image: image,
                title: title,
                content: content,
            });
            setIsLoading(false);
            toast.success("Post updated successfully", {
                autoClose: 4500,
                onClose: () => {
                    // setTimeout(() => {
                    navigate(`/blog/${path}`);
                    // }, 5000);
                },
                theme: "dark",
            });
        } catch (err) {
            setIsLoading(false);
            console.log(err);
        }
    };
    return (
        <div className="newPost">
            <ToastContainer position="top-center" />
            <h2>{t("create post.Edit Post")}</h2>
            <div className="newPost-input">
                <label htmlFor="ImgUrl">
                    {t("create post.Upload a post image:")}{" "}
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={onUpload}
                    name="image"
                    // value={image}
                />
                <span className="error">{formErrors.image}</span>
            </div>

            <div className="newPost-input">
                <label htmlFor="title">{t("create post.Title:")} </label>
                <input
                    type="text"
                    placeholder="Title"
                    name="title"
                    onChange={handleChange}
                    value={title}
                />
                <span className="error">{formErrors.title}</span>
            </div>

            <div className="newPost-input">
                <span>{t("create post.Write content:")}</span>
                <div>
                    <CKEditor
                        editor={ClassicEditor}
                        data={content}
                        config={editorConfig}
                        onReady={(editor) => {
                            // You can store the "editor" and use when it is needed.
                            console.log("Editor is ready to use!", editor);
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setContent(data);
                            setFormErrors({ ...formErrors, content: null });
                            console.log({ event, editor, data });
                        }}
                        onBlur={(event, editor) => {
                            console.log("Blur.", editor);
                        }}
                        onFocus={(event, editor) => {
                            console.log("Focus.", editor);
                        }}
                        name="content"
                    />
                </div>
                <span className="error">{formErrors.content}</span>
            </div>

            <div className="post-btn" onClick={handleUpdatePost}>
                {isLoading ? "Loading..." : t("create post.Update Post")}
            </div>
        </div>
    );
};

export default EditPost;
