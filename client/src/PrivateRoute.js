import React, { useRef, useEffect } from "react";
import { Navigate, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import Cookies from "js-cookie";

const PrivateRoute = ({ children, socket }) => {
    const currentUser = useSelector((state) => state.user.user);
    if (!currentUser || Cookies.get("token") === null) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default PrivateRoute;
