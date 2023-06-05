import React, { useEffect } from "react";
import "./scatterChartVideo.scss";
import { useState } from "react";
import { video } from "../../redux/axios/axios";
import { Scatter } from "react-chartjs-2";
import { Chart, PointElement } from "chart.js";

Chart.register(PointElement);
const ScatterChartVideo = () => {
    const [listVid, setListVid] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await video.get("/getAllVideos");
            setListVid(res.data);
        };
        fetchData();
    }, []);
    const data = listVid.map((data) => ({
        x: data.views,
        y: data["likes"].length,
    }));
    const chartData = {
        datasets: [
            {
                label: "Lượt xem và lượt like",
                data: data,
                backgroundColor: "rgba(75, 192, 192, 0.5)",
                borderColor: "rgb(75, 192, 192)",
                pointRadius: 6,
            },
        ],
    };
    const chartOptions = {
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: "Lượt xem",
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: "Lượt like",
                },
            },
        },
    };
    return (
        <div className="right">
            <h2>Views and Likes videos</h2>
            <Scatter data={chartData} options={chartOptions} />
        </div>
    );
};

export default ScatterChartVideo;
