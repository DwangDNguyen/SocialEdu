import React, { useState, useEffect, useRef } from "react";
import "./home.scss";
import ReactLoading from "react-loading";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/Featured/Featured";
import Chart from "../../components/Chart/Chart";
import TableList from "../../components/TableList/TableList";
import ListVideos from "../../components/ListVideos/ListVideos";
import { video } from "../../redux/axios/axios";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { setSocket } from "../../redux/reducers/socketSlice";
const Home = () => {
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const currentUser = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const socket = useRef();
    useEffect(() => {
        const fetchVideo = async () => {
            setIsLoading(true);
            const res = await video.get("/randomVideo");
            setVideos(res.data);
            setIsLoading(false);
        };
        fetchVideo();
    }, [currentUser._id]);
    // console.log(videos);
    // useEffect(() => {
    //     socket.current = io("ws://localhost:8901");
    // }, []);
    // useEffect(() => {
    //     socket.current.emit("addUserNotifications", currentUser.username);
    // }, [socket, currentUser]);
    // useEffect(() => {
    //     const handleScroll = async () => {
    //         const { scrollTop, clientHeight, scrollHeight } =
    //             document.documentElement;
    //         if (scrollTop + clientHeight >= scrollHeight && !loading) {
    //             setLoading(true);
    //             // Simulate loading more videos from an API
    //             const res = await video.get("/randomMoreVideos");

    //             setTimeout(() => {
    //                 // Append additional videos to the existing list
    //                 const additionalVideos = res.data;
    //                 setVideos((prevVideos) => [
    //                     ...prevVideos,
    //                     ...additionalVideos,
    //                 ]);
    //                 setLoading(false);
    //             }, 1000); // Delay for demonstration purposes
    //         }
    //     };

    //     window.addEventListener("scroll", handleScroll);
    //     return () => {
    //         window.removeEventListener("scroll", handleScroll);
    //     };
    // }, [loading]);
    return (
        <div className="home">
            {/* <Sidebar />
            <div className="container">
                <Navbar /> */}
            {/* <div className="widgets">
                    <Widget type="users" />
                    <Widget type="order" />
                    <Widget type="earning" />
                    <Widget type="balance" />
                </div>
                <div className="charts">
                    <Featured />
                    <Chart title="Last Year (Revenue)" aspect={2 / 1} />
                </div>
                <div className="listContent">
                    <div className="title">Latest Transactions</div>
                    <TableList />
                </div> */}
            {isLoading ? (
                <div className="loading">
                    <ReactLoading type="spokes" color="#a12727" />
                </div>
            ) : (
                <div className="video-list">
                    <ListVideos videos={videos} />
                </div>
            )}
            {/* </div> */}
        </div>
    );
};

export default Home;
