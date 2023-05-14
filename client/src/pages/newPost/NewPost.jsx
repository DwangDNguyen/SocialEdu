import React, { useEffect, useState } from "react";
import "./newPost.scss";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { post } from "../../redux/axios/axios";
import { useNavigate } from "react-router-dom";
const NewPost = () => {
    const [formErrors, setFormErrors] = useState({});
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const navigate = useNavigate();
    const editorConfig = {
        placeholder: "Enter text here...",
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
    const handlePost = async (e) => {
        e.preventDefault();
        setFormErrors(validate(image, title, content));
        console.log({ image, title, content });
        await post.post("/", { image: image, title: title, content: content });
        navigate("/blog");
    };
    return (
        <div className="newPost">
            <h2>Create a new post</h2>
            <div className="newPost-input">
                <label htmlFor="ImgUrl">Upload a post image: </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={onUpload}
                    name="image"
                />
                <span className="error">{formErrors.image}</span>
            </div>

            <div className="newPost-input">
                <label htmlFor="title">Title: </label>
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
                <span>Write content:</span>
                <div>
                    <CKEditor
                        editor={ClassicEditor}
                        // data="<p>Hello from CKEditor 5!</p>"
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

            <div className="post-btn" onClick={handlePost}>
                Post
            </div>
        </div>
    );
};

export default NewPost;
