import React from "react";
import "./listVideos.scss";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
const ListVideos = ({ videos }) => {
    return (
        <>
            {videos.map((video) => (
                <Card key={video._id} video={video} />
            ))}
            {/* <Card />
            <Card />
            <Card />
            <Card /> */}
        </>
    );
};

export default ListVideos;
