import React, { useState, useEffect } from "react";
import "./trending.scss";
import SearchItems from "../../components/SearchItems/SearchItems";
import { video } from "../../redux/axios/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactLoading from "react-loading";
const Trending = () => {
    const [listVidTrending, setListVidTrending] = useState([]);
    // const [dataSource, setDataSource] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        const fetchTrending = async () => {
            const res = await video.get(`/getTrending?page=${currentPage}`);
            setListVidTrending((prevVideos) => [...prevVideos, ...res.data]);
        };
        fetchTrending();
    }, [currentPage]);
    console.log(listVidTrending.length);
    const fetchMoreData = () => {
        if (listVidTrending.length < 30) {
            setCurrentPage((prevPage) => prevPage + 1);
        } else {
            setHasMore(false);
        }
    };
    return (
        <div className="trending">
            <div className="trending-top">
                <img src="https://www.youtube.com/img/trending/avatar/trending.png" />
                <h1>Trending</h1>
            </div>
            <div className="list-trending">
                <InfiniteScroll
                    dataLength={listVidTrending.length} //This is important field to render the next data
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={
                        <div className="loading">
                            <ReactLoading type="bubbles" color="#a12727" />
                        </div>
                    }

                    // below props only if you need pull down functionality
                    // refreshFunction={this.refresh}
                >
                    {listVidTrending?.map((listVidTrending, index) => (
                        <SearchItems
                            videoSearch={listVidTrending}
                            key={index}
                            type="trending"
                        />
                    ))}
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default Trending;
