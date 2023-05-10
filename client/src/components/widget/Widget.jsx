import React from "react";
import "./widget.scss";
import { Link } from "react-router-dom";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PortraitIcon from "@mui/icons-material/Portrait";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import PaidIcon from "@mui/icons-material/Paid";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
const Widget = ({ type }) => {
    let data;
    const amount = 100;
    switch (type) {
        case "users":
            data = {
                name: "USERS",
                isMoney: false,
                link: "See All Users",
                path: "/users",
                icon: (
                    <PortraitIcon
                        className="icon-container"
                        style={{ backgroundColor: "var(--clr-red-dark)" }}
                    />
                ),
            };
            break;
        case "order":
            data = {
                name: "ORDERS",
                isMoney: false,
                link: "See All Orders",
                path: "/",
                icon: (
                    <ProductionQuantityLimitsIcon
                        className="icon-container"
                        style={{ backgroundColor: "var(--clr-grey-1)" }}
                    />
                ),
            };
            break;
        case "earning":
            data = {
                name: "EARNING",
                isMoney: true,
                link: "View Net Earnings",
                path: "/",
                icon: (
                    <PaidIcon
                        className="icon-container"
                        style={{ backgroundColor: "var(--clr-primary-5)" }}
                    />
                ),
            };
            break;
        case "balance":
            data = {
                name: "BALANCE",
                isMoney: true,
                link: "See Detail",
                path: "/",
                icon: (
                    <AccountBalanceIcon
                        className="icon-container"
                        style={{ backgroundColor: "green" }}
                    />
                ),
            };
            break;
        default:
            break;
    }
    return (
        <div className="widget">
            <div className="left">
                <span className="name">{data.name}</span>
                <span className="counter">
                    {data.isMoney && "$"}
                    {amount}
                </span>
                <Link to={data.path}>
                    <span className="link">
                        {data.link}
                        <div className="underline"></div>
                    </span>
                </Link>
            </div>
            <div className="right">
                <div className="percentage positive">
                    20%
                    <KeyboardArrowUpIcon />
                </div>
                {data.icon}
            </div>
        </div>
    );
};

export default Widget;
