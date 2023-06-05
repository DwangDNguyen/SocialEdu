import React, { useState, useEffect } from "react";
import "./chartUser.scss";
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
import { user } from "../../redux/axios/axios";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
const ChartUser = () => {
    const [userData, setUserData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await user.get("/getUserMostSubscribed");
            setUserData(res.data);
        };
        fetchData();
    }, []);
    const username = [];
    const subscribers = [];
    userData.forEach((item) => {
        username.push(item.username);
        subscribers.push(item.subscribers);
    });
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Top users nhiều subscribers nhất",
            },
        },
    };
    const labels = username;
    const data = {
        labels,
        datasets: [
            {
                label: "Subscribers",
                data: subscribers,
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
        ],
    };
    return (
        <div className="chart-user-mostSubscribed">
            <h2>Biểu đồ lượt người dùng</h2>
            <Bar options={options} data={data} />
        </div>
    );
};

export default ChartUser;
