import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.scss";
// import EmailIcon from "@mui/icons-material/Email";
import ReactLoading from "react-loading";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../firebase";
// import { AuthContext } from "../../context/AuthContext.js";
import { Link } from "react-router-dom";
// import axios from "axios";
import { auth } from "../../redux/axios/axios";
import { loginFailure, loginSuccess } from "../../redux/reducers/userSlice";
import Cookies from "js-cookie";

const Login = () => {
    const initialValues = {
        email: "",
        password: "",
    };
    const navigate = useNavigate();
    const [values, setValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    // const [showingAlert, setShowingAlert] = useState(false);
    const dispatch = useDispatch();
    // const { dispatch } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = values;
        setFormErrors(validate(values));
        setIsSubmit(true);
        // signInWithEmailAndPassword(getAuth(), email, password)
        //     .then((userCredential) => {
        //         const user = userCredential.user;
        //         dispatch({ type: "LOGIN", payload: user });
        //         navigate("/");
        //     })
        //     .catch((error) => {
        //         setError(true);
        //     });
        try {
            setLoading(true);
            const res = await auth.post("/login", {
                email,
                password,
            });
            // dispatch({ type: "LOGIN", payload: res.data });
            toast.success("Login Successfully!!", {
                autoClose: 4500,
                onClose: () => {
                    // setTimeout(() => {
                    dispatch(loginSuccess(res.data));
                    navigate("/");
                    // }, 5000);
                },
                theme: "dark",
            });
            let { token, refresh_token } = res.data;
            // localStorage.setItem("token", token);
            Cookies.set("token", token);
            Cookies.set("refresh_token", refresh_token);
            setLoading(false);
        } catch (err) {
            setError(true);
            dispatch(loginFailure());
            setLoading(false);
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
        setFormErrors({ ...formErrors, [name]: null });
    };

    const validate = (value) => {
        const error = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!value.email) {
            error.email = "Please enter this information";
        } else if (!regex.test(value.email)) {
            error.email = "Please enter a valid email";
        }
        if (!value.password) {
            error.password = "Please enter this information";
        } else if (value.password.length < 6) {
            error.password = "Password must be more than 6 characters";
        }
        return error;
    };
    useEffect(() => {
        if (error === true) {
            setTimeout(() => {
                setError(false);
            }, 5000);
        }
    }, [error]);
    return (
        <div className="login">
            <div className="login-container">
                <h1 className="login-title" style={{ color: "black" }}>
                    Login
                </h1>
                <ToastContainer reverseOrder={false} />

                <form onSubmit={handleSubmit}>
                    <div className="login-form-input">
                        <input
                            type="text"
                            name="email"
                            id="email"
                            value={values.email}
                            autoComplete="off"
                            placeholder="Email"
                            onChange={handleChange}
                            className="login-input"
                        />
                        <span className="error">{formErrors.email}</span>
                    </div>
                    <div className="login-form-input">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={values.password}
                            placeholder="Password"
                            onChange={handleChange}
                            className="login-input"
                        />
                        <span className="error">{formErrors.password}</span>
                    </div>
                    <button className="login-button">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        {loading ? "Wait..." : "Login"}
                    </button>
                </form>
                <div className="transfer-resetpassword">
                    <span
                        onClick={() => navigate("/verify?type=verifyEmail")}
                        className="transfer-resetpassword-text"
                    >
                        Forgot your password?
                    </span>
                </div>
                <div className="transfer-register">
                    <span className="transfer-register-text">
                        Create a new account?
                    </span>
                    <span className="register-link">
                        <Link to="/register">Register</Link>
                    </span>
                </div>

                {error && <h2 className="login-failed">Login Failed!!!</h2>}
            </div>
        </div>
    );
};

export default Login;
