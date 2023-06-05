import React, { useState, useEffect } from "react";
import "./chartVideo.scss";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import { video } from "../../redux/axios/axios";
import { useTranslation } from "react-i18next";
ChartJS.register(ArcElement, Tooltip, Legend);
const ChartVideo = () => {
    const [videoData, setVideoData] = useState([]);
    const { t } = useTranslation("video");
    useEffect(() => {
        const fetchData = async () => {
            const res = await video.get("/getVideosMostViewed");
            setVideoData(res.data);
        };
        fetchData();
    }, []);
    const title = [];
    const views = [];
    videoData.forEach((item) => {
        title.push(item.title);
        views.push(item.views);
    });
    const data = {
        labels: title,
        datasets: [
            {
                label: "views",
                data: views,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <div className="chart-video-mostView">
            <h2>{t("video.Top videos most views")}</h2>
            <Pie data={data} className="chart-video" />
        </div>
    );
};

export default ChartVideo;
