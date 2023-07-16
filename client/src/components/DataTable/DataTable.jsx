import React, { useRef } from "react";
import "./dataTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import {
    collection,
    getDocs,
    doc,
    deleteDoc,
    onSnapshot,
} from "firebase/firestore";
import ReactLoading from "react-loading";
import TablePagination from "@mui/material/TablePagination";
import { useEffect } from "react";
import { db, storage } from "../../firebase";
import { user, video } from "../../redux/axios/axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ToastContainer, toast } from "react-toastify";
import Upload from "../Upload/Upload";

const DataTable = ({ type }) => {
    const [data, setData] = useState([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const fetchData = async () => {
        let combinedData;
        let users;
        if (type === "user") {
            users = await user.get("/getAllUser");
            combinedData = users.data;
        } else if (type === "video") {
            const videos = await video.get("/getAllVideos");
            combinedData = videos.data;
        }
        return combinedData;
    };
    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const res = await fetchData();
            setData(res);
            setIsLoading(false);
        };
        getData();
    }, []);

    const deleteItem = async (id) => {
        if (type === "user") {
            await user.delete(`/delete/${id}`);
            toast.success("User Deleted Successfully!!", {
                autoClose: 4500,
                onClose: () => {
                    window.location.reload();
                },
                theme: "dark",
            });
        } else if (type === "video") {
            await video.delete("/video/" + id);
            toast.success("Video Deleted Successfully!!", {
                autoClose: 4500,
                onClose: () => {
                    window.location.reload();
                },
                theme: "dark",
            });
        }
    };
    const handleEdit = (row) => {
        setOpen(true);
        setSelectedRow(row);
    };
    // const columns = [
    //     // {
    //     //     field: "id",
    //     //     headerName: "ID",
    //     //     width: 70,
    //     //     renderCell: (params) => {
    //     //         return <div className="cell-img">{params.row.id}</div>;
    //     //     },
    //     // },
    //     {
    //         field: "avatar",
    //         headerName: "Avatar",
    //         width: 70,
    //         renderCell: (params) => {
    //             return (
    //                 <div className="cell-img">
    //                     <img
    //                         className="cellImg"
    //                         src={params.row.img}
    //                         alt="avatar"
    //                     />
    //                 </div>
    //             );
    //         },
    //     },
    //     {
    //         field: "username",
    //         headerName: "Username",
    //         width: 230,
    //         renderCell: (params) => {
    //             return (
    //                 <div className="cell-img">
    //                     {/* <img
    //                         className="cellImg"
    //                         src={params.row.img}
    //                         alt="avatar"
    //                     /> */}
    //                     {params.row.Username}
    //                 </div>
    //             );
    //         },
    //     },
    //     {
    //         field: "Email",
    //         headerName: "Email",
    //         width: 230,
    //     },
    //     // {
    //     //     field: "Address",
    //     //     headerName: "Address",
    //     //     // type: "number",
    //     //     width: 100,
    //     // },
    //     {
    //         field: "Phone",
    //         headerName: "Phone",
    //         // type: "number",
    //         width: 150,
    //     },
    //     // {
    //     //     field: "status",
    //     //     headerName: "Status",
    //     //     width: 160,
    //     //     renderCell: (params) => {
    //     //         return (
    //     //             <div className={`cellStatus ${params.row.status}`}>
    //     //                 {params.row.status}
    //     //             </div>
    //     //         );
    //     //     },
    //     // },
    //     {
    //         field: "custom",
    //         headerName: "Custom",
    //         width: 200,
    //         sortable: false,
    //         disableColumnMenu: true,
    //         renderCell: (params) => {
    //             return (
    //                 <div className="cellCustom">
    //                     {/* <Link
    //                         to={`/users/${params.row.id}`}
    //                         style={{ textDecoration: "none" }}
    //                     > */}
    //                     <div className="viewButton">View</div>
    //                     {/* </Link> */}
    //                     <div
    //                         className="deleteButton"
    //                         // onClick={() => deleteItem(params.row.id)}
    //                     >
    //                         Delete
    //                     </div>
    //                 </div>
    //             );
    //         },
    //     },
    // ];
    return (
        <>
            <div
                style={{
                    width: "100%",
                    fontSize: "16px!important",
                }}
                className="data-table"
            >
                <ToastContainer position="top-center" />
                {isLoading ? (
                    <div className="loading">
                        <ReactLoading type="spokes" color="#a12727" />
                    </div>
                ) : (
                    <>
                        <TableContainer component={Paper}>
                            <Table
                                sx={{ minWidth: 650 }}
                                aria-label="simple table"
                            >
                                <TableHead>
                                    <TableRow>
                                        {type === "user" ? (
                                            <>
                                                <TableCell>Avatar</TableCell>
                                                <TableCell align="center">
                                                    Username
                                                </TableCell>
                                                <TableCell align="center">
                                                    Email
                                                </TableCell>
                                                <TableCell align="center">
                                                    Phone
                                                </TableCell>
                                                <TableCell align="center">
                                                    Custom
                                                </TableCell>
                                            </>
                                        ) : type === "video" ? (
                                            <>
                                                <TableCell>Video</TableCell>
                                                <TableCell align="center">
                                                    Title
                                                </TableCell>
                                                <TableCell align="center">
                                                    Views
                                                </TableCell>
                                                <TableCell align="center">
                                                    Likes
                                                </TableCell>
                                                <TableCell align="center">
                                                    Custom
                                                </TableCell>
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data
                                        ?.slice(
                                            page * rowsPerPage,
                                            page * rowsPerPage + rowsPerPage
                                        )
                                        ?.map((row) => (
                                            <TableRow
                                                key={row._id}
                                                sx={{
                                                    "&:last-child td, &:last-child th":
                                                        {
                                                            border: 0,
                                                        },
                                                }}
                                            >
                                                {console.log(row)}
                                                {type === "user" ? (
                                                    <React.Fragment
                                                        key={row._id}
                                                    >
                                                        <TableCell
                                                            component="th"
                                                            scope="row"
                                                        >
                                                            <img
                                                                className="cellImg"
                                                                src={
                                                                    row.avatar ||
                                                                    "https://thumbs.dreamstime.com/b/test-icon-vector-question-mark-female-user-person-profile-avatar-symbol-help-sign-glyph-pictogram-illustration-test-168789128.jpg"
                                                                }
                                                                alt="avatar"
                                                            />
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            {row.username}
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            {row.email}
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            {row.phone}
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <div className="cellCustom">
                                                                <Link
                                                                    to={`/users/${row._id}`}
                                                                    style={{
                                                                        textDecoration:
                                                                            "none",
                                                                    }}
                                                                >
                                                                    <div className="viewButton">
                                                                        View
                                                                    </div>
                                                                </Link>
                                                                <div
                                                                    className="deleteButton"
                                                                    onClick={() =>
                                                                        deleteItem(
                                                                            row._id
                                                                        )
                                                                    }
                                                                >
                                                                    Delete
                                                                </div>
                                                                <Link
                                                                    to={`/setting/${row._id}`}
                                                                    style={{
                                                                        textDecoration:
                                                                            "none",
                                                                    }}
                                                                >
                                                                    <div className="editButton">
                                                                        Edit
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        </TableCell>
                                                    </React.Fragment>
                                                ) : type === "video" ? (
                                                    <React.Fragment
                                                        key={row._id}
                                                    >
                                                        <TableCell
                                                            component="th"
                                                            scope="row"
                                                        >
                                                            <img
                                                                className="img-video"
                                                                src={row.ImgUrl}
                                                                alt="img-video"
                                                            />
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <div className="row">
                                                                {row.title}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            {row.views}
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            {
                                                                row["likes"]
                                                                    .length
                                                            }
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <div className="cellCustom">
                                                                <div
                                                                    className="viewButton"
                                                                    onClick={() =>
                                                                        handleEdit(
                                                                            row
                                                                        )
                                                                    }
                                                                >
                                                                    Edit
                                                                </div>
                                                                <div
                                                                    className="deleteButton"
                                                                    onClick={() =>
                                                                        deleteItem(
                                                                            row._id
                                                                        )
                                                                    }
                                                                >
                                                                    Delete
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                        {open && (
                                                            <Upload
                                                                open={open}
                                                                setOpen={
                                                                    setOpen
                                                                }
                                                                type="update"
                                                                videoCurrent={
                                                                    selectedRow
                                                                }
                                                            />
                                                        )}
                                                    </React.Fragment>
                                                ) : (
                                                    <></>
                                                )}
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 100]}
                            component="div"
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </>
                )}
            </div>
        </>
    );
};

export default DataTable;
