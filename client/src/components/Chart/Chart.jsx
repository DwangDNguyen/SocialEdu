import React from "react";
import "./chart.scss";
import { PureComponent } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import ReactLoading from "react-loading";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
const Charts = ({ title, videoUser, isLoading }) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
        },
    };
    const labels = videoUser
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, 5)
        .map((video) => {
            if (video["title"].length > 20) {
                return video.title.substr(0, 20) + "...";
            } else {
                return video.title;
            }
        });
    const data = {
        labels,
        datasets: [
            {
                label: "Views",
                data: videoUser.map((video) => video.views),
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
                label: "Likes",
                data: videoUser.map((video) => video["likes"].length),
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
        ],
    };
    return (
        <div className="chart">
            {isLoading ? (
                <div className="loading">
                    <ReactLoading type="spokes" color="#a12727" />
                </div>
            ) : (
                <>
                    <div className="name">{title}</div>
                    <Bar options={options} data={data} className="chart-bar" />
                </>
            )}
        </div>
    );
};

export default Charts;
