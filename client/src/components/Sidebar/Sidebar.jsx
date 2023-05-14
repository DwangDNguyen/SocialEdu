import React from "react";
import "./sidebar.scss";
import { Link, useNavigate } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import BookIcon from "@mui/icons-material/Book";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PaymentIcon from "@mui/icons-material/Payment";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/reducers/userSlice";
import Cookies from "js-cookie";

const Sidebar = () => {
    // const { currentUser, dispatch } = useContext(AuthContext);
    const currentUser = useSelector((state) => state.user.user);
    // console.log(currentUser.avatar);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate("/login");
    };
    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
        Cookies.set("token", null);

        // dispatch({
        //     type: "LOGOUT",
        //     payload: currentUser,
        // });
    };
    return (
        <div className="sidebar">
            <div className="top">
                <Link to="/">
                    <h1 className="logo">Education Web</h1>
                </Link>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <div className="title main">Main</div>
                    <Link to="/">
                        <li>
                            <DashboardIcon className="icon" />
                            <span>Home</span>
                        </li>
                    </Link>
                    <div className="title lists">Lists</div>
                    <Link to="/users">
                        <li>
                            <PersonIcon className="icon" />
                            <span>Users</span>
                        </li>
                    </Link>
                    <Link to="/products">
                        <li>
                            <StorefrontIcon className="icon" />
                            <span>Products</span>
                        </li>
                    </Link>
                    <li>
                        <PaymentIcon className="icon" />
                        <span>Orders</span>
                    </li>
                    <li>
                        <LocalShippingIcon className="icon" />
                        <span>Delivery</span>
                    </li>
                    <div className="title useful">Useful</div>
                    <Link to={`/calendar/${currentUser._id}`}>
                        <li>
                            <CalendarMonthIcon className="icon" />
                            <span>Calendar</span>
                        </li>
                    </Link>
                    <Link to="/blog">
                        <li>
                            <BookIcon className="icon" />
                            <span>Blog</span>
                        </li>
                    </Link>
                    <div className="title service">Service</div>

                    <li>
                        <HealthAndSafetyIcon className="icon" />
                        <span>System Health</span>
                    </li>
                    {currentUser ? (
                        <Link to={`/setting/${currentUser._id}`}>
                            <li>
                                <SettingsIcon className="icon" />
                                <span>Settings</span>
                            </li>
                        </Link>
                    ) : (
                        <></>
                    )}

                    <div className="title user">User</div>
                    {currentUser ? (
                        <Link to={`/profile/${currentUser._id}`}>
                            <li>
                                <AccountBoxIcon className="icon" />
                                <span>Profile</span>
                            </li>
                        </Link>
                    ) : (
                        <></>
                    )}

                    {currentUser ? (
                        <li onClick={handleLogout}>
                            <LogoutIcon className="icon" />
                            <span>Logout</span>
                        </li>
                    ) : (
                        <li onClick={handleLogin}>
                            <LoginIcon className="icon" />
                            <span>Login</span>
                        </li>
                    )}
                </ul>
                {/* <div className="handleMenu">
                    <ArrowBackIcon className="icon icon-handleMenu icon-close-menu" />
                    <ArrowForwardIcon className="icon icon-handleMenu icon-open-menu" />
                </div> */}
            </div>
        </div>
    );
};

export default Sidebar;
