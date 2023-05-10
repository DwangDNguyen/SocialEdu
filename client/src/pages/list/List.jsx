import React from "react";
import "./list.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import DataTable from "../../components/DataTable/DataTable";
const List = ({ title, namePath }) => {
    return (
        <div className="list">
            <Sidebar />
            <div className="list-container">
                <Navbar />
                <DataTable title={title} namePath={namePath} />
            </div>
        </div>
    );
};

export default List;
