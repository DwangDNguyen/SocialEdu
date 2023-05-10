import React from "react";
import "./featured.scss";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

const Featured = () => {
    return (
        <div className="featured">
            <div className="top">
                <span className="name">Total Revenue</span>
                <MoreVertIcon className="icon" />
            </div>
            <div className="bottom">
                <div className="featuredChart">
                    <CircularProgressbar value="70" text={"70%"} />
                </div>
                <span className="name">Total sales made today</span>
                <span className="amount">420$</span>
                <span className="desc">
                    Previous transactions processing. Last payments may not be
                    included
                </span>
                <div className="summary">
                    <div className="item">
                        <span className="name">Target</span>
                        <div className="changeData positive">
                            <KeyboardDoubleArrowUpIcon />
                            4.2%
                        </div>
                    </div>
                    <div className="item">
                        <span className="name">Last Week</span>
                        <div className="changeData positive">
                            <KeyboardDoubleArrowUpIcon />
                            4.2%
                        </div>
                    </div>
                    <div className="item">
                        <span className="name">Last Month</span>
                        <div className="changeData negative">
                            <KeyboardDoubleArrowDownIcon />
                            4.2%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;
