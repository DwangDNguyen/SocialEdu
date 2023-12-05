import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import SinglePage from "./pages/singlePage/SinglePage";
import New from "./pages/new/New";
import { userInputs, productInputs } from "./formInput";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
// import { AuthContext } from "./context/AuthContext";
import AddEvent from "./pages/addEvent/AddEvent";
import MyCalendar from "./pages/myCalendar/MyCalendar";
import UpdateEvent from "./pages/updateEvent/UpdateEvent";
import Video from "./pages/video/Video";
import Register from "./pages/register/Register";
// import { useDispatch, useSelector } from "react-redux";
import Profile from "./pages/profile/Profile";
import Setting from "./pages/setting/Setting";
import Channel from "./pages/channel/Channel";
import Chat from "./pages/chat/Chat";
import PrivateRoute from "./PrivateRoute";
// import { io } from "socket.io-client";
import Layout from "./components/Layout/Layout";
import Search from "./pages/search/Search";
import Blogs from "./pages/blogs/Blogs";
import Post from "./pages/post/Post";
import NewPost from "./pages/newPost/NewPost";
import EditPost from "./pages/EditPost/EditPost";
import CustomUser from "./pages/customUser/CustomUser";
import CustomVideo from "./pages/customVideo/CustomVideo";
import AdminUser from "./pages/adminUser/AdminUser";
import AdminVideo from "./pages/adminVideo/AdminVideo";
import Trending from "./pages/trending/Trending";
import VerifyOTP from "./pages/verifyOTP/VerifyOTP";
import Chatbot from "./pages/chatbot/Chatbot";

function App() {
    const { darkMode } = useContext(DarkModeContext);
    // const { currentUser } = useContext(AuthContext);
    // const { currentUser } = useSelector((state) => state.user);
    // console.log(currentUser);
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    // const currentUser = useSelector((state) => state.user.user);
    // useEffect(() => {
    //     if (!currentUser) {
    //         dispatch(navigate("/login", { replace: true }));
    //     }
    // }, [dispatch, currentUser]);

    return (
        <div className={darkMode ? "app dark" : "app"}>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/verify" element={<VerifyOTP />} />

                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <Layout>
                                    <Home />
                                </Layout>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/trending"
                        element={
                            <PrivateRoute>
                                <Layout>
                                    <Trending />
                                </Layout>
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/users"
                        element={
                            <PrivateRoute>
                                <Layout>
                                    <List title="List Users" namePath="users" />
                                </Layout>
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/users/:userId"
                        element={
                            <PrivateRoute>
                                <Layout>
                                    <SinglePage />
                                </Layout>
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/users/new"
                        element={
                            <PrivateRoute>
                                <Layout>
                                    <New
                                        name="users"
                                        inputs={userInputs}
                                        title="Add New User"
                                    />
                                </Layout>
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/update/:userId"
                        element={
                            <PrivateRoute>
                                <Layout>
                                    <New
                                        inputs={userInputs}
                                        title="Edit User"
                                    />
                                </Layout>
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/products"
                        element={
                            <PrivateRoute>
                                <Layout>
                                    <List
                                        title="List Products"
                                        namePath="products"
                                    />
                                </Layout>
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/products/:productId"
                        element={
                            <PrivateRoute>
                                <Layout>
                                    <SinglePage />
                                </Layout>
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/products/new"
                        element={
                            <PrivateRoute>
                                <Layout>
                                    <New
                                        name="products"
                                        inputs={productInputs}
                                        title="Add New Product"
                                    />
                                </Layout>
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/calendar/:id"
                        element={
                            <PrivateRoute>
                                <Layout>
                                    <MyCalendar title="Calendar" />
                                </Layout>
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/event/add"
                        element={
                            <PrivateRoute>
                                <Layout>
                                    <AddEvent />
                                </Layout>
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/event/:id/update"
                        element={
                            <PrivateRoute>
                                <Layout>
                                    <UpdateEvent />
                                </Layout>
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/video/:id"
                        element={
                            <PrivateRoute>
                                <Layout>
                                    <Video />
                                </Layout>
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/profile/:id"
                        element={
                            <PrivateRoute>
                                <Layout>
                                    <Profile />
                                </Layout>
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/channel/:id"
                        element={
                            <PrivateRoute>
                                <Layout>
                                    <Channel />
                                </Layout>
                            </PrivateRoute>
                        }
                    />
                    <Route path="/register" element={<Register />} />

                    <Route
                        path="/setting/:id"
                        element={
                            <PrivateRoute>
                                <Layout>
                                    <Setting />
                                </Layout>
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/chat"
                        element={
                            <PrivateRoute>
                                <Layout>
                                    <Chat />
                                </Layout>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/search"
                        element={
                            <PrivateRoute>
                                <Layout>
                                    <Search />
                                </Layout>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/blog"
                        element={
                            <PrivateRoute>
                                <Layout>
                                    <Blogs />
                                </Layout>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/blog/:id"
                        element={
                            <PrivateRoute>
                                <Layout>
                                    <Post />
                                </Layout>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/blog/new"
                        element={
                            <PrivateRoute>
                                <Layout>
                                    <NewPost />
                                </Layout>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/blog/edit/:id"
                        element={
                            <PrivateRoute>
                                <Layout>
                                    <EditPost />
                                </Layout>
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/chatbot"
                        element={
                            <PrivateRoute>
                                <Layout>
                                    <Chatbot />
                                </Layout>
                            </PrivateRoute>
                        }
                    />

                    {/* admin */}
                    <Route
                        path="/admin/list"
                        element={
                            <PrivateRoute>
                                <Layout>
                                    <List title="List Users" />
                                </Layout>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/admin/listUser"
                        element={
                            <PrivateRoute>
                                <Layout>
                                    <CustomUser />
                                </Layout>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/admin/listVideo"
                        element={
                            <PrivateRoute>
                                <Layout>
                                    <CustomVideo />
                                </Layout>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/admin/users"
                        element={
                            <PrivateRoute>
                                <Layout>
                                    <AdminUser />
                                </Layout>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/admin/videos"
                        element={
                            <PrivateRoute>
                                <Layout>
                                    <AdminVideo />
                                </Layout>
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
