import React, { useState, useEffect } from "react";
import "./verifyOTP.scss";
import { useNavigate, useLocation } from "react-router-dom";
import OtpInput from "react-otp-input";
import { registerUser } from "../../helper/helper.js";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { auth } from "../../redux/axios/axios";
const VerifyOTP = () => {
    const location = useLocation();
    const type = new URLSearchParams(location.search).get("type");
    console.log(type);
    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleVerifyEmail = async (e) => {
        e.preventDefault();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (email === "") {
            setError("Please enter your email");
        } else if (!regex.test(email)) {
            setError("Please enter a valid email");
        } else {
            setError("");
            localStorage.setItem("email", email);
            await auth.post("/send-otp", { email: email });
            navigate("/verify?type=verifyOtp");
        }
    };

    const verifyOtpToResetPassword = async (e) => {
        e.preventDefault();
        try {
            const res = await auth.post("/verifyOtp", { otp });
            if (res.status === 200) {
                navigate("/verify?type=resetPassword");
            } else {
                toast.error(res.data.message);
            }
            // navigate("/resetPassword");
        } catch (e) {
            console.log(e);
            toast.error(e.response.data.message);
        }
    };

    const handleSaveNewPassword = async (e) => {
        const userEmail = localStorage.getItem("email");
        e.preventDefault();
        try {
            if (password === "") {
                setError("Please enter your password");
            } else if (password.length < 6) {
                setError("Password must be at least 6 characters");
            } else {
                setError("");
                await auth.put("/resetPassword", {
                    email: userEmail,
                    password: password,
                });
                localStorage.removeItem("email");
                toast.success("Password changed successfully");
                navigate("/login");
            }
        } catch (e) {}
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const values = JSON.parse(localStorage.getItem("user"));

            let customPromise = registerUser({ ...values, otp });
            console.log({ ...values, otp });
            toast.promise(customPromise, {
                success:
                    type === "verifyRegister"
                        ? "Register Successfully...!"
                        : "Successfully...! Please reset your password",
                // error: "Register Failed...!. Username or Email already exists",
                error: {
                    render({ data }) {
                        console.log(data);
                        if (data.response.data.error) {
                            return data.response.data.error;
                        } else {
                            return "Register Failed...! Something went wrong in information you entered.";
                        }
                    },
                },

                theme: "dark",
            });

            customPromise.then(function () {
                setTimeout(() => {
                    type === "verifyRegister"
                        ? navigate("/login")
                        : navigate("/resetPassword");
                }, 5000);
            });
        } catch (err) {
            toast.error("OTP failed");
        }
    };

    return (
        <div className="verify-otp">
            <ToastContainer theme="dark" />

            <div className="verify-otp-container">
                <h1 className="verify-otp-title" style={{ color: "black" }}>
                    {type === "verifyEmail"
                        ? "Verify Email"
                        : type === "resetPassword"
                        ? "Reset Password"
                        : "Verify OTP"}
                </h1>
                <h2 className="verify-otp-subtitle">
                    {type === "verifyEmail"
                        ? "Please enter the email to reset password"
                        : type === "resetPassword"
                        ? "Create a new password"
                        : "Please enter the OTP you received on your email"}
                </h2>
                {type === "verifyEmail" ? (
                    <>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            value={email}
                            autoComplete="off"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input"
                        />
                        <span className="error">{error}</span>
                    </>
                ) : type === "resetPassword" ? (
                    <>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            autoComplete="off"
                            placeholder="New Password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"
                        />
                        <span className="error">{error}</span>
                    </>
                ) : (
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        // renderSeparator={<span>-</span>}
                        inputStyle={{
                            width: "40px",
                            height: "40px",
                            fontSize: "16px",
                            border: `2px solid #c6c6c6`,
                            borderRadius: "5px",
                            margin: "10px",
                        }}
                        renderInput={(props) => <input {...props} />}
                    />
                )}

                <button
                    className="verify-otp-button"
                    onClick={
                        type === "verifyEmail"
                            ? handleVerifyEmail
                            : type === "verifyOtp"
                            ? verifyOtpToResetPassword
                            : type === "resetPassword"
                            ? handleSaveNewPassword
                            : handleSubmit
                    }
                >
                    {type === "verifyEmail"
                        ? "Next"
                        : type === "resetPassword"
                        ? "Save"
                        : "Verify"}
                </button>
                {/* <ToastContainer reverseOrder={false} /> */}
            </div>
        </div>
    );
};

export default VerifyOTP;
