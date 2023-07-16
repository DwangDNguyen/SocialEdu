import React, { useState, useEffect } from "react";
import "./verifyOTP.scss";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { registerUser } from "../../helper/helper.js";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const VerifyOTP = () => {
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const values = JSON.parse(localStorage.getItem("user"));

            let registerPromise = registerUser({ ...values, otp });
            console.log({ ...values, otp });
            toast.promise(registerPromise, {
                success: "Register Successfully...!",
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

            registerPromise.then(function () {
                setTimeout(() => {
                    navigate("/login");
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
                    Verify OTP
                </h1>
                <h2 className="verify-otp-subtitle">
                    Please enter the OTP you received on your email
                </h2>
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
                <button className="verify-otp-button" onClick={handleSubmit}>
                    Verify
                </button>
                {/* <ToastContainer reverseOrder={false} /> */}
            </div>
        </div>
    );
};

export default VerifyOTP;
