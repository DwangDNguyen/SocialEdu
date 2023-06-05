import React from "react";
import "./adminUser.scss";
import ChartUser from "../../components/ChartUser/ChartUser";
import NewUserList from "../../components/NewUserList/NewUserList";
const AdminUser = () => {
    return (
        <div className="admin-user">
            <ChartUser />
            <NewUserList />
        </div>
    );
};

export default AdminUser;
