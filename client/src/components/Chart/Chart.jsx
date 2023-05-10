import React from "react";
import "./chart.scss";
import { PureComponent } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
const data = [
    {
        name: "Jan",
        total: 1200,
    },
    {
        name: "Feb",
        total: 2400,
    },
    {
        name: "Mar",
        total: 600,
    },
    {
        name: "Arp",
        total: 1000,
    },
    {
        name: "May",
        total: 2000,
    },
    {
        name: "Jun",
        total: 7200,
    },
    {
        name: "Jul",
        total: 6000,
    },
    {
        name: "Aug",
        total: 3000,
    },
    {
        name: "Sep",
        total: 4500,
    },
    {
        name: "Oct",
        total: 5200,
    },
    {
        name: "Nov",
        total: 2600,
    },
    {
        name: "Dec",
        total: 1800,
    },
];
const Charts = ({ title, aspect }) => {
    return (
        <div className="chart">
            <div className="name">{title}</div>
            <ResponsiveContainer width="100%" aspect={aspect}>
                <AreaChart
                    className="chartGrid"
                    width={730}
                    height={250}
                    data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                            <stop
                                offset="5%"
                                stopColor="#bb2525"
                                stopOpacity={0.8}
                            />
                            <stop
                                offset="95%"
                                stopColor="#bb2525"
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" className="grid" />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="total"
                        stroke="#bb2525"
                        fillOpacity={1}
                        fill="url(#total)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Charts;
