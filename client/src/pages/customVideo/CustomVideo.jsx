import React, { useState, useEffect } from "react";
import "./customVideo.scss";
import DataTable from "../../components/DataTable/DataTable";

const CustomVideo = () => {
    return (
        <div className="customVideo">
            <DataTable type="video" />
        </div>
    );
};

export default CustomVideo;
