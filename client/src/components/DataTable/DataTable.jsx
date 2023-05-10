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

import { useEffect } from "react";
import { db, storage } from "../../firebase";

const rows = [
    {
        id: 1,
        username: "Snow",
        firstName: "Jon",
        age: 35,
        phone: 1234567890,
        status: "active",
        email: "test@gmail.com",
        img: "https://img.freepik.com/free-photo/gold-chinese-money-coins-chinese-new-year-background-3d-illustration-empty-display-scene-presentation-product-placement_56104-1889.jpg?w=1060&t=st=1673685783~exp=1673686383~hmac=002797b1312d29db326289f8947a9a0eac9f5505c8c04483d7901bbe55f9b861",
    },
    {
        id: 2,
        username: "Lannister",
        firstName: "Cersei",
        age: 42,
        phone: 1357992468,
        status: "passive",
        email: "test1@gmail.com",
        img: "https://img.freepik.com/free-photo/gold-chinese-money-coins-chinese-new-year-background-3d-illustration-empty-display-scene-presentation-product-placement_56104-1889.jpg?w=1060&t=st=1673685783~exp=1673686383~hmac=002797b1312d29db326289f8947a9a0eac9f5505c8c04483d7901bbe55f9b861",
    },
    {
        id: 3,
        username: "Lannister",
        firstName: "Jaime",
        age: 45,
        phone: 1357992468,
        status: "active",
        email: "test3@gmail.com",
        img: "https://img.freepik.com/free-photo/gold-chinese-money-coins-chinese-new-year-background-3d-illustration-empty-display-scene-presentation-product-placement_56104-1889.jpg?w=1060&t=st=1673685783~exp=1673686383~hmac=002797b1312d29db326289f8947a9a0eac9f5505c8c04483d7901bbe55f9b861",
    },
    {
        id: 4,
        username: "Stark",
        firstName: "Arya",
        age: 16,
        phone: 1357992468,
        status: "active",
        email: "test4@gmail.com",
        img: "https://img.freepik.com/free-photo/gold-chinese-money-coins-chinese-new-year-background-3d-illustration-empty-display-scene-presentation-product-placement_56104-1889.jpg?w=1060&t=st=1673685783~exp=1673686383~hmac=002797b1312d29db326289f8947a9a0eac9f5505c8c04483d7901bbe55f9b861",
    },
    {
        id: 5,
        username: "Targaryen",
        firstName: "Daenerys",
        age: null,
        phone: 1357992468,
        status: "passive",
        email: "test@gmail.com",
        img: "https://img.freepik.com/free-photo/gold-chinese-money-coins-chinese-new-year-background-3d-illustration-empty-display-scene-presentation-product-placement_56104-1889.jpg?w=1060&t=st=1673685783~exp=1673686383~hmac=002797b1312d29db326289f8947a9a0eac9f5505c8c04483d7901bbe55f9b861",
    },
    {
        id: 6,
        username: "Melisandre",
        firstName: "Dawn",
        age: 150,
        phone: 1357992468,
        status: "active",
        email: "test@gmail.com",
        img: "https://img.freepik.com/free-photo/gold-chinese-money-coins-chinese-new-year-background-3d-illustration-empty-display-scene-presentation-product-placement_56104-1889.jpg?w=1060&t=st=1673685783~exp=1673686383~hmac=002797b1312d29db326289f8947a9a0eac9f5505c8c04483d7901bbe55f9b861",
    },
    {
        id: 7,
        username: "Clifford",
        firstName: "Ferrara",
        age: 44,
        phone: 1357992468,
        status: "active",
        email: "test@gmail.com",
        img: "https://img.freepik.com/free-photo/gold-chinese-money-coins-chinese-new-year-background-3d-illustration-empty-display-scene-presentation-product-placement_56104-1889.jpg?w=1060&t=st=1673685783~exp=1673686383~hmac=002797b1312d29db326289f8947a9a0eac9f5505c8c04483d7901bbe55f9b861",
    },
    {
        id: 8,
        username: "Frances",
        firstName: "Rossini",
        age: 36,
        phone: 1357992468,
        status: "passive",
        email: "test@gmail.com",
        img: "https://img.freepik.com/free-photo/gold-chinese-money-coins-chinese-new-year-background-3d-illustration-empty-display-scene-presentation-product-placement_56104-1889.jpg?w=1060&t=st=1673685783~exp=1673686383~hmac=002797b1312d29db326289f8947a9a0eac9f5505c8c04483d7901bbe55f9b861",
    },
    {
        id: 9,
        username: "Roxie",
        firstName: "Harvey",
        age: 65,
        phone: 1357992468,
        status: "active",
        email: "test@gmail.com",
        img: "https://img.freepik.com/free-photo/gold-chinese-money-coins-chinese-new-year-background-3d-illustration-empty-display-scene-presentation-product-placement_56104-1889.jpg?w=1060&t=st=1673685783~exp=1673686383~hmac=002797b1312d29db326289f8947a9a0eac9f5505c8c04483d7901bbe55f9b861",
    },
];

const DataTable = ({ title, namePath }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // const fetchData = async () => {
        //     const querySnapshot = await getDocs(collection(db, "users"));
        //     const list = [];
        //     querySnapshot.forEach((doc) => {
        //         // doc.data() is never undefined for query doc snapshots
        //         list.push({ id: doc.id, ...doc.data() });
        //     });
        //     setData(list);
        // };
        // fetchData();
        const unsub = onSnapshot(
            collection(db, "users"),
            (snapshot) => {
                let list = [];
                snapshot.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() });
                });
                setData(list);
            },
            (error) => {
                console.log(error);
            }
        );
        return () => {
            unsub();
        };
    }, []);
    console.log(data);

    const deleteItem = async (id) => {
        try {
            await deleteDoc(doc(db, "users", id));
            setData(data.filter((item) => item.id !== id));
        } catch (err) {
            console.log(err);
        }
    };
    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        {
            field: "user",
            headerName: "User",
            width: 230,
            renderCell: (params) => {
                return (
                    <div className="cell-img">
                        <img
                            className="cellImg"
                            src={params.row.img}
                            alt="avatar"
                        />
                        {params.row.Username}
                    </div>
                );
            },
        },
        {
            field: "Email",
            headerName: "Email",
            width: 230,
        },
        {
            field: "Address",
            headerName: "Address",
            // type: "number",
            width: 100,
        },
        {
            field: "Phone",
            headerName: "Phone",
            // type: "number",
            width: 150,
        },
        {
            field: "status",
            headerName: "Status",
            width: 160,
            renderCell: (params) => {
                return (
                    <div className={`cellStatus ${params.row.status}`}>
                        {params.row.status}
                    </div>
                );
            },
        },
        {
            field: "custom",
            headerName: "Custom",
            width: 200,
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                return (
                    <div className="cellCustom">
                        <Link
                            to={`/users/${params.row.id}`}
                            style={{ textDecoration: "none" }}
                        >
                            <div className="viewButton">View</div>
                        </Link>
                        <div
                            className="deleteButton"
                            onClick={() => deleteItem(params.row.id)}
                        >
                            Delete
                        </div>
                    </div>
                );
            },
        },
    ];
    return (
        <>
            <div className="top-table">
                <h1 className="title-table">{title}</h1>
                <Link to={`/${namePath}/new`}>
                    <div className="btn-new">
                        New <AddIcon className="icon-new" />
                    </div>
                </Link>
            </div>
            <div
                style={{ height: 400, width: "100%", fontSize: "16px" }}
                className="data-table"
            >
                <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={8}
                    rowsPerPageOptions={[8]}
                    checkboxSelection
                    className="data"
                />
            </div>
        </>
    );
};

export default DataTable;
