/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import "./setting.scss";
import { useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { user } from "../../redux/axios/axios";
import { useDispatch } from "react-redux";
import { updateSuccess } from "../../redux/reducers/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { useReducer } from "react";
import ReactLoading from "react-loading";
const Setting = () => {
    const currentUser = useSelector((state) => state.user.user);
    const idPerson = useLocation().pathname.split("/")[2];
    const [person, setPerson] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation("setting");
    const dispatch = useDispatch();
    const initialValues = {
        username: "",
        email: "",
        phone: "",
    };
    const [loading, setLoading] = useState(true);
    const [values, setValues] = useState(initialValues);
    // const [formErrors, setFormErrors] = useState({
    //     username: "",
    //     email: "",
    //     phone: "",
    // });
    const [file, setFile] = useState();
    const [showInput, setShowInput] = useState({
        username: false,
        email: false,
        phone: false,
    });

    useEffect(() => {
        const fetchUser = async () => {
            const res = await user.get("/find/" + idPerson);
            setPerson(res.data);
            if (currentUser._id !== idPerson) {
                setValues(res.data);
                setFile(res.data.avatar);
            } else {
                setValues({
                    username: currentUser.username,
                    email: currentUser.email,
                    phone: currentUser.phone,
                });
                setFile(currentUser.avatar);
            }
            setLoading(false);
        };
        fetchUser();
    }, [idPerson]);

    console.log(values);
    const handleChange = (e) => {
        // console.log(showInput[e.target.name]);
        if (showInput[e.target.name]) {
            setValues({
                ...values,
                [e.target.name]: e.target.value,
            });
        }
        // setFormErrors({ ...formErrors, [e.target.name]: null });
    };

    const showInputChange = (value) => {
        setShowInput({
            ...showInput,
            [value]: true,
        });
        // console.log(formErrors[value]);
        if (showInput[value]) {
            setShowInput({
                ...showInput,
                [value]: false,
            });
        }
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
        setFile(base64);
    };

    // const refreshToken = async () => {
    //     try {
    //         const res = await axios.post("/api/auth/refreshToken", {
    //             token: values.refreshToken,
    //         });
    //         setValues(
    //             Object.assign(values, {
    //                 accessToken: res.data.accessToken,
    //                 refreshToken: res.data.refreshToken,
    //             })
    //         );
    //         return res.data;
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };
    // const axiosJWT = axios.create();

    // axiosJWT.interceptors.request.use(
    //     async (config) => {
    //         try {
    //             let currentDate = new Date();
    //             const decodedToken = jwt_decode(values.accessToken);
    //             if (decodedToken.exp * 1000 < currentDate.getTime()) {
    //                 const data = await refreshToken();
    //                 config.headers["authorization"] =
    //                     "Bearer " + data.accessToken;
    //             }
    //             return config;
    //         } catch (err) {
    //             return Promise.reject(err);
    //         }
    //     },
    //     (error) => {
    //         return Promise.reject({ error: error });
    //     }
    // );
    const submitChange = (e) => {
        e.preventDefault();
        // setFormErrors(validate(values));
        // console.log(values);
        try {
            setIsLoading(true);
            user.put(`/${idPerson}`, {
                username: values.username,
                email: values.email,
                phone: values.phone,
                avatar: file,
            }).then((res) => {
                toast.success("Update Successfully!!", {});
                if (currentUser._id === idPerson) {
                    dispatch(updateSuccess(res.data));
                }
                setIsLoading(false);
                // dispatch(updateSuccess(res.data));
            });
        } catch (err) {
            console.log(err);
        }
    };
    // const validate = (values) => {
    //     const error = {};
    //     const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    //     const regexPhone =
    //         /^(?:\+84|0)(1\d{9}|3\d{8}|5\d{8}|7\d{8}|8\d{8}|9\d{8})$/;
    //     if (!values.username) {
    //         error.username = "Username is required";
    //     }
    //     if (!values.email) {
    //         error.email = "Email is required";
    //     } else if (!regexEmail.test(values.email)) {
    //         error.email = "Email is invalid";
    //     }
    //     if (!values.phone) {
    //         error.phone = "Phone is required";
    //     } else if (!regexPhone.test(values.phone)) {
    //         error.phone = "Phone is invalid";
    //     }
    //     return error;
    // };
    return loading ? (
        <div className="loading">
            <ReactLoading type="spokes" color="#a12727" />
        </div>
    ) : (
        <div className="setting">
            {/* <Sidebar />
            <div className="container">
                <Navbar /> */}
            <div className="setting-content">
                <ToastContainer position="top-center" theme="dark" />
                <div className="setting-form">
                    <form
                        onSubmit={submitChange}
                        className="setting-form-block"
                    >
                        <div className="setting-field avt">
                            <label htmlFor="avatar" className="add-img-image">
                                <img
                                    src={
                                        file ||
                                        "https://thumbs.dreamstime.com/b/test-icon-vector-question-mark-female-user-person-profile-avatar-symbol-help-sign-glyph-pictogram-illustration-test-168789128.jpg"
                                    }
                                />
                            </label>
                            <input
                                type="file"
                                name="avatar"
                                id="avatar"
                                style={{ display: "none" }}
                                onChange={onUpload}
                            />
                        </div>
                        <div className="setting-field">
                            <div className="setting-info">
                                {t("setting.Username")}:{" "}
                                {showInput.username === false &&
                                    values.username}
                                <div
                                    className="change-btn"
                                    onClick={() => showInputChange("username")}
                                >
                                    {showInput.username
                                        ? t("setting.Update")
                                        : t("setting.Change")}
                                </div>
                            </div>
                            {showInput.username && (
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    autoComplete="off"
                                    placeholder="Username"
                                    className="setting-input"
                                    value={values.username}
                                    onChange={handleChange}
                                />
                            )}
                            {/* {formErrors.username && showInput.username && (
                                    <div className="error">
                                        {formErrors.username}
                                    </div>
                                )} */}
                        </div>
                        <div className="setting-field">
                            <div className="setting-info">
                                {t("setting.Phone")}: {""}
                                {showInput.phone === false && values.phone}
                                <div
                                    className="change-btn"
                                    onClick={() => showInputChange("phone")}
                                >
                                    {showInput.phone
                                        ? t("setting.Update")
                                        : t("setting.Change")}
                                </div>
                            </div>
                            {showInput.phone && (
                                <input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    autoComplete="off"
                                    placeholder="Phone"
                                    className="setting-input"
                                    value={values.phone}
                                    onChange={handleChange}
                                />
                            )}
                            {/* {formErrors.phone && showInput.phone && (
                                    <div className="error">
                                        {formErrors.phone}
                                    </div>
                                )} */}
                        </div>
                        <div className="setting-field">
                            <div className="setting-info">
                                {t("setting.Email")}:{" "}
                                {showInput.email === false && values.email}
                                <div
                                    className="change-btn"
                                    onClick={() => showInputChange("email")}
                                >
                                    {showInput.email
                                        ? t("setting.Update")
                                        : t("setting.Change")}
                                </div>
                            </div>
                            {showInput.email && (
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    autoComplete="off"
                                    placeholder="Email"
                                    className="setting-input"
                                    value={values.email}
                                    onChange={handleChange}
                                />
                            )}
                            {/* {formErrors.email && showInput.email && (
                                    <div className="error">
                                        {formErrors.email}
                                    </div>
                                )} */}
                        </div>
                        {/* <div className="setting-field">
                                <div className="setting-info">
                                    Password: {currentUser.password}
                                    <div className="change-btn">change</div>
                                </div>
                                <input
                                    type="text"
                                    name="password"
                                    id="password"
                                    autoComplete="off"
                                    placeholder="Password"
                                    className="setting-input"
                                    value={currentUser.password}
                                    onChange={handleChange}
                                />
                            </div> */}
                        <div className="setting-submit">
                            <button className="submit-change">
                                {isLoading ? "Loading..." : t("setting.Submit")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {/* </div> */}
        </div>
    );
};

export default Setting;
