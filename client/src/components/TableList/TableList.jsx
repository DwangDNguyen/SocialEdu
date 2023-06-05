import React, { useState, useEffect } from "react";
import "./tableList.scss";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { video } from "../../redux/axios/axios";
import { format } from "timeago.js";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

const TableList = ({ userId, videoUser }) => {
    const rows = [
        {
            id: 1143155,
            product: "Acer Nitro 5",
            img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
            customer: "John Smith",
            date: "1 March",
            amount: 785,
            method: "Cash on Delivery",
            status: "Approved",
        },
        {
            id: 2235235,
            product: "Playstation 5",
            img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
            customer: "Michael Doe",
            date: "1 March",
            amount: 900,
            method: "Online Payment",
            status: "Pending",
        },
        {
            id: 2342353,
            product: "Redragon S101",
            img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
            customer: "John Smith",
            date: "1 March",
            amount: 35,
            method: "Cash on Delivery",
            status: "Pending",
        },
        {
            id: 2357741,
            product: "Razer Blade 15",
            img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
            customer: "Jane Smith",
            date: "1 March",
            amount: 920,
            method: "Online",
            status: "Approved",
        },
        {
            id: 2342355,
            product: "ASUS ROG Strix",
            img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
            customer: "Harold Carol",
            date: "1 March",
            amount: 2000,
            method: "Online",
            status: "Pending",
        },
    ];
    return (
        <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell className="table-cell">
                            Video
                        </StyledTableCell>
                        <StyledTableCell className="table-cell">
                            Title
                        </StyledTableCell>
                        <StyledTableCell className="table-cell">
                            Views
                        </StyledTableCell>
                        <StyledTableCell className="table-cell">
                            Likes
                        </StyledTableCell>
                        <StyledTableCell className="table-cell">
                            Created At
                        </StyledTableCell>
                        {/* <StyledTableCell className="table-cell">
                            Payment Method
                        </StyledTableCell>
                        <StyledTableCell className="table-cell">
                            Status
                        </StyledTableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {videoUser.map((row) => (
                        <StyledTableRow key={row._id}>
                            <StyledTableCell
                                className="table-cell-item"
                                component="th"
                                scope="row"
                            >
                                <img
                                    src={row.ImgUrl}
                                    alt=""
                                    className="image"
                                />
                            </StyledTableCell>
                            <StyledTableCell className="table-cell-item">
                                {row.title}
                            </StyledTableCell>
                            <StyledTableCell className="table-cell-item">
                                {row.views}
                            </StyledTableCell>
                            <StyledTableCell className="table-cell-item">
                                {row["likes"].length}
                            </StyledTableCell>
                            <StyledTableCell className="table-cell-item">
                                {format(row.createdAt)}
                            </StyledTableCell>
                            {/* <StyledTableCell className="table-cell-item">
                                {row.method}
                            </StyledTableCell>
                            <StyledTableCell className="table-cell-item">
                                <span className={`status ${row.status}`}>
                                    {row.status}
                                </span>
                            </StyledTableCell> */}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableList;
