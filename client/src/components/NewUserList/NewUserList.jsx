import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import "./newUserList.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { user } from "../../redux/axios/axios";
import { format } from "timeago.js";
const NewUserList = () => {
    const [newUsers, setNewUsers] = useState([]);
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
    useEffect(() => {
        const fetchData = async () => {
            const res = await user.get("/getNewUsers");
            setNewUsers(res.data);
        };
        fetchData();
    }, []);

    const rows = [...newUsers];
    console.log(rows);
    return (
        <div className="new-user-list">
            <h3>List New User</h3>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell
                                sx={{ fontSize: 14, fontWeight: "bold" }}
                            >
                                User
                            </StyledTableCell>
                            <StyledTableCell
                                sx={{ fontSize: 14, fontWeight: "bold" }}
                                align="center"
                            >
                                Email
                            </StyledTableCell>
                            <StyledTableCell
                                sx={{ fontSize: 14, fontWeight: "bold" }}
                                align="center"
                            >
                                Phone
                            </StyledTableCell>
                            <StyledTableCell
                                sx={{ fontSize: 14, fontWeight: "bold" }}
                                align="center"
                            >
                                Created At
                            </StyledTableCell>
                            <StyledTableCell
                                sx={{ fontSize: 14, fontWeight: "bold" }}
                                align="center"
                            >
                                Subscribers
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row._id}>
                                <StyledTableCell component="th" scope="row">
                                    <img
                                        className="avatar"
                                        src={
                                            row.avatar ||
                                            "https://thumbs.dreamstime.com/b/test-icon-vector-question-mark-female-user-person-profile-avatar-symbol-help-sign-glyph-pictogram-illustration-test-168789128.jpg"
                                        }
                                        alt="avatar"
                                    />
                                    {row.username}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {row.email}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {row.phone}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {format(row.createdAt)}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {row.subscribers}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default NewUserList;
