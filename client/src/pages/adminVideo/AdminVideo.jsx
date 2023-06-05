import React from "react";
import "./adminVideo.scss";
import ChartVideo from "../../components/ChartVideo/ChartVideo";
import NewVideoList from "../../components/NewVideoList/NewVideoList";
import ScatterChartVideo from "../../components/ScatterChartVideo/ScatterChartVideo";
const AdminVideo = () => {
    return (
        <div className="admin-video">
            <div className="admin-video-top">
                <ChartVideo />
                <ScatterChartVideo />
            </div>
            <div className="admin-video-bottom">
                <NewVideoList />
            </div>
        </div>
    );
};

export default AdminVideo;
