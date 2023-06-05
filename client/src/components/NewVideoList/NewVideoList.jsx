import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import "./newVideoList.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { video } from "../../redux/axios/axios";
import { format } from "timeago.js";
const NewVideoList = () => {
    const [newVideos, setNewVideos] = useState([]);
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
            const res = await video.get("/getVideosNewest");
            setNewVideos(res.data);
        };
        fetchData();
    }, []);

    const rows = [...newVideos];
    console.log(rows);
    return (
        <div className="new-video-list">
            <h3>List New Video</h3>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell
                                sx={{ fontSize: 14, fontWeight: "bold" }}
                                align="center"
                            >
                                Video
                            </StyledTableCell>
                            <StyledTableCell
                                sx={{ fontSize: 14, fontWeight: "bold" }}
                                align="center"
                            >
                                Title
                            </StyledTableCell>
                            <StyledTableCell
                                sx={{ fontSize: 14, fontWeight: "bold" }}
                                align="center"
                            >
                                Views
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
                                Liked
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row._id}>
                                <StyledTableCell
                                    align="center"
                                    component="th"
                                    scope="row"
                                >
                                    <img
                                        className="img-video"
                                        src={row.ImgUrl}
                                        alt="img-video"
                                    />
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <div className="row">{row.title}</div>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {row.views}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {format(row.createdAt)}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {row["likes"].length}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default NewVideoList;
