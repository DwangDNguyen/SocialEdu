// import { Modal, Button } from "react-bootstrap";
import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./popping.scss";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
    deleteEventApi,
    showEventApi,
} from "../../redux/actions/eventsAction.js";
import { closeEvent } from "../../redux/actions/modalAction";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import { parse, format } from "date-fns";
import { useTranslation } from "react-i18next";
const Popping = ({
    open,
    handleClose,
    event,
    deleteEventApi,
    renderStatus,
    rerender,
}) => {
    const navigate = useNavigate();
    const { id, describe, title, start, end } = event;
    const { t } = useTranslation("calendar");
    console.log(event);
    // console.log(end);
    const handleDelete = async () => {
        await deleteEventApi(event.id);
        rerender(!renderStatus);
    };
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };
    // const startString = String(start).slice(4);
    // console.log(startString);

    // const startObj = parse(start, "dd MMM yy x", new Date());
    // const formatStart = format(startObj, "dd/MM/yyyy HH:mm:ss");
    const modal = () => {
        return (
            // <Modal show={open}>
            //     <Modal.Header closeButton>
            //         <Modal.Title className="text-capitalize">
            //             {title}
            //         </Modal.Title>
            //     </Modal.Header>
            //     <Modal.Body>
            //         {describe ? (
            //             <p className="lead">{describe}</p>
            //         ) : (
            //             "No Dsecriptions Yet"
            //         )}
            //         <div className="row justify-content-between">
            //             <p className="col small text-muted text-center pb-0 mb-0">
            //                 from: {start}
            //             </p>
            //             <p className="col small text-muted text-center pb-0 mb-0">
            //                 to: {end}
            //             </p>
            //         </div>
            //     </Modal.Body>
            //     <Modal.Footer>
            //         <Button variant="warning" onClick={handleClose}>
            //             Close
            //         </Button>
            //         <Link to={`/event/${id}/update`}>
            //             <Button variant="success">Update</Button>
            //         </Link>
            //         <Button variant="danger" onClick={handleDelete}>
            //             Delete
            //         </Button>
            //     </Modal.Footer>
            // </Modal>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        class="text-modal"
                    >
                        {title}
                    </Typography>
                    <Typography
                        id="modal-modal-description"
                        className="describe-modal"
                        sx={{ mt: 2 }}
                    >
                        {describe ? describe : "No Dsecriptions Yet"}
                    </Typography>
                    <Typography
                        id="modal-modal-description"
                        className="describe-modal"
                        sx={{ mt: 2 }}
                    >
                        {t("popping.From")}: {start}
                    </Typography>
                    <Typography
                        id="modal-modal-description"
                        className="describe-modal"
                        sx={{ mt: 2 }}
                    >
                        {t("popping.To")}: {end}
                    </Typography>
                    <Stack
                        spacing={2}
                        direction="row"
                        justifyContent="end"
                        mt={5}
                    >
                        <Button
                            variant="text"
                            className="btn btn-cancel"
                            onClick={handleClose}
                        >
                            {t("popping.Cancel")}
                        </Button>
                        <Button
                            variant="contained"
                            className="btn btn-delete"
                            onClick={handleDelete}
                        >
                            {t("popping.Delete")}
                        </Button>
                        <Link to={`/event/${id}/update`}>
                            <Button
                                variant="contained"
                                className="btn btn-update"
                            >
                                {t("popping.Update")}
                            </Button>
                        </Link>
                    </Stack>
                </Box>
            </Modal>
        );
    };

    if (id) {
        return modal();
    } else {
        <p>there is no modal to preview</p>;
    }
};

function mapStateToProps({ event }) {
    return {
        event,
        // modalStatus,
    };
}

export default connect(mapStateToProps, { deleteEventApi, closeEvent })(
    Popping
);
