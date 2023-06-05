import React, { useState, useEffect } from "react";
import "./customUser.scss";
import DataTable from "../../components/DataTable/DataTable";

const CustomUser = () => {
    return (
        <div className="customUser">
            <DataTable type="user" />
        </div>
    );
};

export default CustomUser;
