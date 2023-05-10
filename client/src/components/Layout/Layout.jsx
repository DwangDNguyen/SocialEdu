import React, { useEffect, useRef } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import "./layout.scss";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { setSocket } from "../../redux/reducers/socketSlice";
const Layout = ({ children }) => {
    const socket = useRef();
    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.user.user);
    useEffect(() => {
        socket.current = io("ws://localhost:8901");
        dispatch(setSocket(socket.current));
    }, []);
    useEffect(() => {
        socket.current.emit("addUserNotifications", currentUser.username);
    }, [currentUser, socket]);
    return (
        <div className="layout">
            <Sidebar />
            <div className="container">
                <Navbar socket={socket} />
                {children}
            </div>
        </div>
    );
};

export default Layout;
