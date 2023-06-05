import React, { useState, useEffect } from "react";
import "./notify.scss";
import { format } from "timeago.js";
import { user } from "../../redux/axios/axios";
const Notify = ({ n }) => {
    const [userNotify, setUserNotify] = useState({});
    useEffect(() => {
        const getUser = async () => {
            const res = await user.get("/find/" + n.senderId);
            setUserNotify(res.data);
        };
        getUser();
    }, [n.senderId]);
    return (
        <div className="notification-item">
            <img src={userNotify.avatar} />
            <div className="notification-content">
                <span>{n.content}</span>
                <span className="time-notification">{format(n.createdAt)}</span>
            </div>
        </div>
    );
};

export default Notify;
