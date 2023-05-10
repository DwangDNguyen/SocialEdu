import React, { useState, useEffect } from "react";
import "./recommendVid.scss";
import { Link } from "react-router-dom";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CardColumn from "../CardProfile/CardProfile";
import { video, user } from "../../redux/axios/axios";
import CardColumnRandom from "../CardColumnRandom/CardColumnRandom";
const RecommendVid = ({ tags }) => {
    const [recommendVid, setRecommendVid] = useState([]);
    // const [channels, setChannels] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await video.get(`/tags?tags=${tags}`);
            setRecommendVid(res.data);
        };
        fetchData();
    }, [tags]);
    // console.log(recommendVid);

    // console.log(channels);
    return (
        <>
            {recommendVid.map((video, index) => (
                <CardColumnRandom key={index} video={video} />
            ))}
        </>
    );
};

export default RecommendVid;
