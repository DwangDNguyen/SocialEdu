import React, { useRef, useEffect } from "react";
import { Navigate, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const PrivateRoute = ({ children, socket }) => {
    const currentUser = useSelector((state) => state.user.user);
    if (!currentUser) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default PrivateRoute;
