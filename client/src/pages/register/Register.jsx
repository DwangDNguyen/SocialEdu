/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { auth, user } from "../../redux/axios/axios";

const Register = () => {
    const initialValues = {
        username: "",
        email: "",
        phone: "",
        avatar: "",
        password: "",
        confirmPassword: "",
    };
    const [values, setValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [error, setError] = useState(false);

    const [file, setFile] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValues(
            Object.assign(values, {
                avatar:
                    file ||
                    "https://thumbs.dreamstime.com/b/test-icon-vector-question-mark-female-user-person-profile-avatar-symbol-help-sign-glyph-pictogram-illustration-test-168789128.jpg",
            })
        );
        setFormErrors(validate(values));
        setIsSubmit(true);

        try {
            // const { data } = await auth.post("/register", values);
            if (Object.keys(formErrors).length === 0 && isSubmit) {
                // let registerPromise = registerUser(values);
                // toast.promise(registerPromise, {
                //     success: "Register Successfully...!",
                //     // error: "Register Failed...!. Username or Email already exists",
                //     error: {
                //         render({ data }) {
                //             console.log(data);
                //             if (data.response.data.error) {
                //                 return data.response.data.error;
                //             } else {
                //                 return "Register Failed...!";
                //             }
                //         },
                //     },

                //     theme: "dark",
                // });

                // registerPromise.then(function () {
                //     setTimeout(() => {
                //         navigate("/login");
                //     }, 5000);
                // });
                localStorage.setItem("user", JSON.stringify(values));
                console.log(values.email);
                await auth.post("/send-otp", { email: values.email });

                navigate("/verify?type=verifyRegister");
            }
        } catch (err) {
            setError(true);
            if (err.response.data.error) {
                setFormErrors({
                    ...formErrors,
                    [err.response.data.key]: err.response.data.error,
                });
                console.log(formErrors);
            } else {
                setFormErrors(validate(values));
            }
        }
    };
    console.log(values);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
        setFormErrors({ ...formErrors, [name]: null });
    };
    const validate = (value) => {
        const error = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const regexPhone =
            /^(?:\+84|0)(1\d{9}|3\d{8}|5\d{8}|7\d{8}|8\d{8}|9\d{8})$/;
        if (!value.username) {
            error.username = "Please enter this information";
        }
        if (!value.email) {
            error.email = "Please enter this information";
        } else if (!regex.test(value.email)) {
            error.email = "This is not a valid email format";
        }
        if (!value.phone) {
            error.phone = "Please enter this information";
        } else if (!regexPhone.test(value.phone)) {
            error.phone = "This is not a valid phone format";
        }
        if (!value.password) {
            error.password = "Please enter this information";
        } else if (value.password.length < 6) {
            error.password = "Password must be more than 6 characters";
        }
        if (!value.confirmPassword) {
            error.confirmPassword = "Please enter this information";
        } else if (value.confirmPassword !== value.password) {
            error.confirmPassword = "Please enter the correct password";
        }
        return error;
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
    useEffect(() => {
        if (error === true) {
            setTimeout(() => {
                setError(false);
            }, 5000);
        }
    }, [error]);
    // useEffect(() => {
    //     console.log(Object.keys(formErrors));
    //     if (isSubmit && success === true) {
    //         setTimeout(() => {
    //             setSuccess(false);
    //         }, 3000);
    //     }
    // }, [isSubmit, success]);
    const onUpload = async (e) => {
        const base64 = await convert(e.target.files[0]);
        setFile(base64);
    };
    return (
        <div className="register">
            <div className="register-container">
                <h1 className="register-title" style={{ color: "black" }}>
                    Register
                </h1>

                <ToastContainer theme="dark" />

                <form onSubmit={handleSubmit} className="form-register">
                    <div className="register-form-input avt">
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
                    <div className="list-input">
                        <div className="register-form-input">
                            <input
                                type="username"
                                name="username"
                                id="username"
                                autoComplete="off"
                                placeholder="Username"
                                className="register-input"
                                value={values.username}
                                onChange={handleChange}
                            />
                            <span className="error">{formErrors.username}</span>
                        </div>
                        <div className="register-form-input">
                            <input
                                type="phone"
                                name="phone"
                                id="phone"
                                autoComplete="off"
                                placeholder="Phone"
                                className="register-input"
                                value={values.phone}
                                onChange={handleChange}
                            />
                            <span className="error">{formErrors.phone}</span>
                        </div>
                        <div className="register-form-input">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                autoComplete="off"
                                placeholder="Email"
                                className="register-input"
                                value={values.email}
                                onChange={handleChange}
                            />
                            <span className="error">{formErrors.email}</span>
                        </div>
                        <div className="register-form-input">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                className="register-input"
                                value={values.password}
                                onChange={handleChange}
                            />
                            <span className="error">{formErrors.password}</span>
                        </div>
                        <div className="register-form-input">
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                autoComplete="off"
                                placeholder="Confirm Password"
                                className="register-input"
                                value={values.confirmPassword}
                                onChange={handleChange}
                            />
                            <span className="error">
                                {formErrors.confirmPassword}
                            </span>
                        </div>
                        <button className="register-button">register</button>
                    </div>
                </form>
                <div className="transfer-login">
                    <span className="transfer-login-text">
                        Have an account?
                    </span>
                    <span className="login-link">
                        <Link to="/login">Login</Link>
                    </span>
                </div>
                {error && (
                    <h2 className="register-failed">Register Failed!!!</h2>
                )}
            </div>
        </div>
    );
};

export default Register;
