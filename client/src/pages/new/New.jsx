/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./new.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    setDoc,
    getDocs,
    deleteDoc,
    onSnapshot,
    updateDoc,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase";
import { useEffect } from "react";
const New = ({ name, inputs, title }) => {
    let initialValues;
    if (name === "users") {
        initialValues = {
            Username: "",
            Name: "",
            Email: "",
            Phone: "",
            Address: "",
            Password: "",
        };
    } else {
        initialValues = {
            Title: "",
            Description: "",
            Category: "",
            Price: "",
            Stock: "",
        };
    }
    const [file, setFile] = useState("");
    const [data, setData] = useState(initialValues);
    const [state, setState] = useState({});
    const { userId } = useParams();
    console.log(userId);
    const [per, setPer] = useState(null);
    useEffect(() => {
        const uploadFile = () => {
            const name = new Date().getTime() + file.name;
            const metadata = {
                contentType: "image/jpeg",
            };
            const storageRef = ref(storage, file.name);
            const uploadTask = uploadBytesResumable(storageRef, file, metadata);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    setPer(progress);
                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    switch (error.code) {
                        case "storage/unauthorized":
                            break;
                        case "storage/canceled":
                            break;

                        case "storage/unknown":
                            break;
                        default:
                            break;
                    }
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        (downloadURL) => {
                            setData((prev) => ({ ...prev, img: downloadURL }));
                        }
                    );
                }
            );
        };
        file && uploadFile();
    }, [file]);

    // useEffect(() => {
    //     if (userId) {
    //         setData(...state[userId]);
    //     } else {
    //         setData(...initialValues);
    //     }

    //     return () => {
    //         setData(...initialValues);
    //     };
    // }, [userId, state]);
    const navigate = useNavigate();

    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [error, setError] = useState(true);
    // const [showingAlert, setShowingAlert] = useState(false);

    // const { dispatch } = useContext(AuthContext);

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const { email, password } = values;
    //     setFormErrors(validate(values));
    //     setIsSubmit(true);
    //     signInWithEmailAndPassword(auth, email, password)
    //         .then((userCredential) => {
    //             const user = userCredential.user;
    //             dispatch({ type: "LOGIN", payload: user });
    //             navigate("/");
    //         })
    //         .catch((error) => {
    //             setError(true);
    //         });
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { Username, Name, Email, Phone, Address, Password } = data;
        setFormErrors(validate(data));
        setIsSubmit(true);
        if (
            Username !== "" &&
            Email !== "" &&
            Phone !== "" &&
            Address !== "" &&
            Name !== "" &&
            Password !== "" &&
            formErrors.Username === undefined &&
            formErrors.Email === undefined &&
            formErrors.Phone === undefined &&
            formErrors.Address === undefined &&
            formErrors.Name === undefined &&
            formErrors.Password === undefined
        ) {
            if (userId) {
                await updateDoc(doc(db, "users", userId), {
                    ...data,
                    timeStamp: serverTimestamp(),
                });
                navigate(-1);
            } else {
                await addDoc(collection(db, "users"), {
                    ...data,
                    timeStamp: serverTimestamp(),
                });
                navigate(-1);
            }
        }
    };
    const handleChange = (e) => {
        const { name, value, id } = e.target;
        setData({ ...data, [name]: value, [id]: value });
        setFormErrors({ ...formErrors, [name]: null, [id]: null });
    };

    const validate = (value) => {
        const error = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!value.Username) {
            error.Username = "Please enter this information";
        }
        if (!value.Name) {
            error.Name = "Please enter this information";
        }
        if (!value.Phone) {
            error.Phone = "Please enter this information";
        }
        if (!value.Address) {
            error.Address = "Please enter this information";
        }
        if (!value.Email) {
            error.Email = "Please enter this information";
        }
        if (!value.Password) {
            error.Password = "Please enter this information";
        } else if (value.Password.length < 6) {
            error.Password = "Password must be more than 6 characters";
        }
        return error;
    };
    // const handleChange = (e) => {
    //     const id = e.target.id;
    //     const value = e.target.value;

    //     setData({ ...data, [id]: value });
    // };
    // console.log(data);

    return (
        <div className="new">
            <Sidebar />
            <div className="new-container">
                <Navbar />
                <div className="new-content">
                    <div className="top">
                        <h1 className="new-title">{title}</h1>
                    </div>
                    <div className="bottom">
                        <div className="left">
                            <label htmlFor="file" className="add-img-image">
                                <img
                                    src={
                                        file
                                            ? URL.createObjectURL(file)
                                            : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                    }
                                />
                            </label>
                            <input
                                type="file"
                                id="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                style={{ display: "none" }}
                            />
                        </div>
                        <div className="right">
                            <form onSubmit={handleSubmit}>
                                <div className="column-1">
                                    {inputs.slice(0, 3).map((input, index) => {
                                        return (
                                            <div
                                                className="form-input"
                                                key={index}
                                            >
                                                <label className="input-title">
                                                    {input.label}
                                                </label>
                                                <input
                                                    id={input.label}
                                                    name={input.label}
                                                    type={input.type}
                                                    value={
                                                        data[input.label] || ""
                                                    }
                                                    placeholder={
                                                        input.placeholder
                                                    }
                                                    onChange={handleChange}
                                                />
                                                <span className="error">
                                                    {formErrors[input.label]}
                                                </span>
                                            </div>
                                        );
                                    })}
                                    {/* <div className="form-input">
                                        <label className="input-title">
                                            Username:
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Username"
                                        />
                                    </div>
                                    <div className="form-input">
                                        <label className="input-title">
                                            Name:
                                        </label>
                                        <input type="text" placeholder="Name" />
                                    </div>
                                    <div className="form-input">
                                        <label className="input-title">
                                            Email:
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="Email"
                                        />
                                    </div> */}
                                </div>
                                <div className="column-2">
                                    {inputs
                                        .slice(3, inputs.length)
                                        .map((input, index) => {
                                            return (
                                                <div
                                                    className="form-input"
                                                    key={index}
                                                >
                                                    <label className="input-title">
                                                        {input.label}
                                                    </label>
                                                    <input
                                                        id={input.label}
                                                        type={input.type}
                                                        name={input.label}
                                                        value={
                                                            data[input.label] ||
                                                            ""
                                                        }
                                                        placeholder={
                                                            input.placeholder
                                                        }
                                                        onChange={handleChange}
                                                    />
                                                    <span className="error">
                                                        {
                                                            formErrors[
                                                                input.label
                                                            ]
                                                        }
                                                    </span>
                                                </div>
                                            );
                                        })}

                                    {/* <div className="form-input">
                                        <label className="input-title">
                                            Phone:
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="Phone"
                                        />
                                    </div>
                                    <div className="form-input">
                                        <label className="input-title">
                                            Address:
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Address"
                                        />
                                    </div>
                                    <div className="form-input">
                                        <label className="input-title">
                                            Password:
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="Password"
                                        />
                                    </div> */}
                                </div>
                                <input
                                    disabled={per !== null && per < 100}
                                    type="submit"
                                    value={userId ? "Update" : "Submit"}
                                    className="btn-submit"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default New;
