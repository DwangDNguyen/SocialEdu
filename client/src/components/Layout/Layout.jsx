import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import "./layout.scss";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { setSocket } from "../../redux/reducers/socketSlice";
import { useNavigate } from "react-router-dom";
const Layout = ({ children }) => {
    const socket = useRef();
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const currentUser = useSelector((state) => state.user.user);
    const navigate = useNavigate();
    // useEffect(() => {
    //     socket.current = io("ws://localhost:8901");
    //     dispatch(setSocket(socket.current));
    // }, []);
    // useEffect(() => {
    //     socket.current.emit("addUserNotifications", currentUser.username);
    // }, [currentUser, socket]);
    const handleChangeSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    };
    const submitSearch = () => {
        navigate(`/search?q=${encodeURIComponent(search)}`);
        setSearch("");
        // window.location.reload();
    };
    return (
        <div className="layout">
            <Sidebar
                search={search}
                handleChangeSearch={handleChangeSearch}
                submitSearch={submitSearch}
            />
            <div className="container">
                <Navbar
                    socket={socket}
                    search={search}
                    handleChangeSearch={handleChangeSearch}
                    submitSearch={submitSearch}
                />
                {children}
            </div>
        </div>
    );
};

export default Layout;
