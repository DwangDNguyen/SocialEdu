/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import "./singlePage.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Chart from "../../components/Chart/Chart";
import TableList from "../../components/TableList/TableList";
import { useParams, Link } from "react-router-dom";
// import {  rows } from "../../components/DataTable/DataTable";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const SinglePage = () => {
    const { userId } = useParams();
    const [user, setUser] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, "users", userId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setUser(docSnap.data());
            } else {
                console.log("Error");
            }
        };
        fetchData();
    }, [userId]);

    return (
        <div className="singlePage">
            <Sidebar />
            <div className="singlePage-container">
                <Navbar />
                <div className="singlePage-content">
                    <div className="singlePage-content-top">
                        <div className="left">
                            <div className="single-avatar">
                                <img src={user.img} />
                            </div>
                            <div className="single-info">
                                <h1>{user.Username}</h1>
                                <div className="info-item">
                                    <span className="info-title">Email:</span>
                                    <span className="info-content">
                                        {user.Email}
                                    </span>
                                </div>
                                <div className="info-item">
                                    <span className="info-title">Phone:</span>
                                    <span className="info-content">
                                        {user.Phone}
                                    </span>
                                </div>
                                <div className="info-item">
                                    <span className="info-title">Address:</span>
                                    <span className="info-content">
                                        {user.Address}
                                    </span>
                                </div>
                                {/* <div className="info-item">
                                    <span className="info-title">Country:</span>
                                    <span className="info-content">
                                        {thisUser.country}
                                    </span>
                                </div> */}
                            </div>
                            <Link
                                to={`/update/${userId}`}
                                style={{ textDecoration: "none" }}
                            >
                                <div className="edit-btn">Edit</div>
                            </Link>
                        </div>
                        <div className="right">
                            <Chart
                                title="User Spending (Last Year)"
                                aspect={4 / 1}
                            />
                        </div>
                    </div>
                    <div className="singlePage-content-bottom">
                        <h1 className="title-table">Latest Transactions</h1>
                        <TableList />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SinglePage;
