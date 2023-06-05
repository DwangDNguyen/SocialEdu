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
import { user, video } from "../../redux/axios/axios";
import ReactLoading from "react-loading";
const SinglePage = () => {
    const { userId } = useParams();
    const [thisUser, setThisUser] = useState([]);
    const [videoUser, setVideoUser] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const docRef = doc(db, "users", userId);
    //         const docSnap = await getDoc(docRef);

    //         if (docSnap.exists()) {
    //             setUser(docSnap.data());
    //         } else {
    //             console.log("Error");
    //         }
    //     };
    //     fetchData();
    // }, [userId]);
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const res = await user.get("/find/" + userId);
            const resVids = await video.get("/findUser/" + userId);
            setVideoUser(resVids.data);
            setThisUser(res.data);
            setIsLoading(false);
        };
        fetchData();
    }, [userId]);

    return (
        <div className="singlePage">
            <div className="singlePage-content">
                <div className="singlePage-content-top">
                    <div className="left">
                        {isLoading ? (
                            <div className="loading">
                                <ReactLoading type="spokes" color="#a12727" />
                            </div>
                        ) : (
                            <>
                                <div className="single-avatar">
                                    <img
                                        src={
                                            thisUser.avatar ||
                                            "https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                                        }
                                    />
                                </div>
                                <div className="single-info">
                                    <h1>{thisUser.username}</h1>
                                    <div className="info-item">
                                        <span className="info-title">
                                            Email:
                                        </span>
                                        <span className="info-content">
                                            {thisUser.email}
                                        </span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-title">
                                            Phone:
                                        </span>
                                        <span className="info-content">
                                            {thisUser.phone}
                                        </span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-title">
                                            Subscribers:
                                        </span>
                                        <span className="info-content">
                                            {thisUser.subscribers}
                                        </span>
                                    </div>
                                    {/* <div className="info-item">
                                    <span className="info-title">Country:</span>
                                    <span className="info-content">
                                        {thisUser.country}
                                    </span>
                                </div> */}
                                </div>
                            </>
                        )}

                        {/* <Link
                            to={`/update/${userId}`}
                            style={{ textDecoration: "none" }}
                        >
                            <div className="edit-btn">Edit</div>
                        </Link> */}
                    </div>
                    {/* <div className="right"> */}

                    <Chart
                        title="Views and Likes oldest videos"
                        videoUser={videoUser}
                        isLoading={isLoading}
                    />

                    {/* </div> */}
                </div>
                <div className="singlePage-content-bottom">
                    {isLoading ? (
                        <div className="loading">
                            <ReactLoading type="spokes" color="#a12727" />
                        </div>
                    ) : (
                        <>
                            <h1 className="title-table">Latest Videos</h1>
                            <TableList userId={userId} videoUser={videoUser} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SinglePage;
