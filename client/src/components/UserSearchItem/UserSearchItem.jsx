import React from "react";
import "./userSearchItem.scss";
import { useNavigate } from "react-router-dom";
const UserSearchItem = ({ userSearch, key }) => {
    const navigate = useNavigate();
    return (
        <div
            className="user-search-item"
            key={key}
            onClick={() => navigate(`/channel/${userSearch._id}`)}
        >
            <div className="user-search-item-avatar">
                <img src={userSearch.avatar} alt="" />
            </div>
            <div className="user-search-item-info">
                <h3>{userSearch.username}</h3>
                <p>Subscribers: {userSearch.subscribers}</p>
            </div>
        </div>
    );
};

export default UserSearchItem;
