import React from "react";
import "./sidebar.scss";
import { Link, useNavigate } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import BookIcon from "@mui/icons-material/Book";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import PaymentIcon from "@mui/icons-material/Payment";
import SearchIcon from "@mui/icons-material/Search";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import ViewListIcon from "@mui/icons-material/ViewList";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MenuIcon from "@mui/icons-material/Menu";
import BarChartIcon from "@mui/icons-material/BarChart";
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
import { useTranslation } from "react-i18next";

const Sidebar = ({
    setOpenSidebar,
    openSidebar,
    search,
    handleChangeSearch,
    submitSearch,
}) => {
    // const { currentUser, dispatch } = useContext(AuthContext);
    const { t } = useTranslation();
    const currentUser = useSelector((state) => state.user.user);
    // console.log(currentUser.avatar);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const handleLogin = () => {
    //     navigate("/login");
    // };
    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
        Cookies.remove("token");
        Cookies.remove("refresh_token");

        // dispatch({
        //     type: "LOGOUT",
        //     payload: currentUser,
        // });
    };
    console.log(currentUser);
    return (
        <div className={openSidebar ? "sidebar openRes" : "sidebar"}>
            <div className="top">
                {openSidebar && (
                    <div className="menu-icon-sidebar">
                        <MenuIcon
                            className="icon"
                            onClick={() => setOpenSidebar(false)}
                        />
                    </div>
                )}
                <Link to="/">
                    <h1 className="logo">Education Web</h1>
                </Link>
            </div>
            <hr />

            <div className="center">
                <ul>
                    <div className="title main">{t("home.Main")}</div>
                    <Link to="/">
                        <li>
                            <DashboardIcon className="icon" />
                            <span>{t("home.Home")}</span>
                        </li>
                    </Link>
                    <Link to="/trending">
                        <li>
                            <WhatshotIcon className="icon" />
                            <span>{t("home.Trending")}</span>
                        </li>
                    </Link>
                    {currentUser.isAdmin === true ? (
                        <>
                            <div className="title lists">Lists</div>
                            <Link to="/admin/users">
                                <li>
                                    <BarChartIcon className="icon" />

                                    <span>Users</span>
                                </li>
                            </Link>
                            <Link to="/admin/videos">
                                <li>
                                    <VideoLibraryIcon className="icon" />
                                    <span>Videos</span>
                                </li>
                            </Link>
                            <Link to="/admin/listUser">
                                <li>
                                    <PersonIcon className="icon" />
                                    <span>List Users</span>
                                </li>
                            </Link>
                            <Link to="/admin/listVideo">
                                <li>
                                    <ViewListIcon className="icon" />
                                    <span>List Videos</span>
                                </li>
                            </Link>
                        </>
                    ) : (
                        ""
                    )}
                    <div className="title useful">{t("home.Useful")}</div>
                    <Link to={`/calendar/${currentUser._id}`}>
                        <li>
                            <CalendarMonthIcon className="icon" />
                            <span>{t("home.Calendar")}</span>
                        </li>
                    </Link>
                    <Link to="/blog">
                        <li>
                            <BookIcon className="icon" />
                            <span>{t("home.Blog")}</span>
                        </li>
                    </Link>
                    <Link to="/chatbot">
                        <li>
                            <WhatshotIcon className="icon" />
                            <span>{t("home.Chatbot")}</span>
                        </li>
                    </Link>
                    <div className="title service">{t("home.Service")}</div>

                    {/* <li>
                        <HealthAndSafetyIcon className="icon" />
                        <span>System Health</span>
                    </li> */}

                    <Link to={`/setting/${currentUser._id}`}>
                        <li>
                            <SettingsIcon className="icon" />
                            <span>{t("home.Setting")}</span>
                        </li>
                    </Link>

                    <div className="title user">{t("home.User")}</div>

                    <Link to={`/profile/${currentUser._id}`}>
                        <li>
                            <AccountBoxIcon className="icon" />
                            <span>{t("home.Profile")}</span>
                        </li>
                    </Link>

                    <li onClick={handleLogout}>
                        <LogoutIcon className="icon" />
                        <span>{t("home.Logout")}</span>
                    </li>
                </ul>
            </div>
            {/* {openSidebar && (
                <div className="search">
                    <input
                        type="text"
                        className="search-input"
                        placeholder={t("search input.Search...")}
                        value={search}
                        onChange={handleChangeSearch}
                    />
                    <div className="search-button" onClick={submitSearch}>
                        <SearchIcon />
                    </div>
                </div>
            )} */}
        </div>
    );
};

export default Sidebar;
