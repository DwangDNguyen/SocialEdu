// import "bootstrap/dist/css/bootstrap.min.css";
import "./addEvent.scss";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addEventApi } from "../../redux/actions/eventsAction";
import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { set } from "date-fns";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

//schema to validate event inputs
const schema = yup
    .object({
        title: yup.string().required("Can't Be Empty"),
        start: yup.date().required("Please specify the time to start"),
    })
    .required();
const AddEvent = ({ addEventApi, error }) => {
    const navigate = useNavigate();
    const [rerender, setRerender] = useState(false);
    const [dbError, setError] = useState(false);
    const [firstRender, setFirstRender] = useState(true);
    const currentUser = useSelector((state) => state.user.user);

    useEffect(() => {
        if (error && !firstRender) {
            setError(error);
        }
        if (!error.start && !error.end && dbError !== false) {
            setTimeout(navigate("/calendar"));
        }
    }, [rerender]);
    //using form-hook to register event data
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (values) => {
        setFirstRender(false);
        addEventApi(values).then(() => {
            setRerender(!rerender);
            navigate(`/calendar/${currentUser._id}`);
        });
    };

    return (
        <div className="add-event">
            {/* <Sidebar />
            <div className="add-event-container">
                <Navbar />
                <div className="add-event-content"> */}
            <div className="top">
                <h1 className="add-event-title">Add Event</h1>
            </div>
            <div className="bottom">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="form-add-event"
                >
                    <div className="input-info">
                        <label htmlFor="title" className="form-label">
                            Event Title
                        </label>
                        <input
                            {...register("title")}
                            type="text"
                            placeholder="Title"
                            className="form-controll"
                            id="title"
                            aria-describedby="title"
                        />
                        <p
                            className={`error-text ${
                                errors.title ? "active" : ""
                            }`}
                        >
                            {errors.title ? (
                                <ErrorOutlineIcon className="error-icon" />
                            ) : (
                                ""
                            )}
                            {errors.title?.message}
                        </p>
                    </div>
                    <div className="input-info" style={{ zIndex: "100" }}>
                        <label htmlFor="start" className="form-label">
                            Start Date
                        </label>
                        {/* controllers are the way you can wrap and use datePicker inside react form-hook*/}
                        {/* start date controller*/}
                        <Controller
                            control={control}
                            name="start"
                            render={({ field }) => (
                                <DatePicker
                                    placeholderText="Select date"
                                    onChange={(date) => field.onChange(date)}
                                    selected={field.value}
                                    value={field.value}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    className="form-controll"
                                    id="start"
                                    autoComplete="off"
                                />
                            )}
                        />
                        {/* error handling */}
                        <p
                            className={`error-text ${
                                errors.start ? "active" : ""
                            }`}
                        >
                            {errors.start ? (
                                <ErrorOutlineIcon className="error-icon" />
                            ) : (
                                ""
                            )}
                            {errors.start?.message}
                        </p>
                        <p
                            className={`error-text error-2 ${
                                dbError.start ? "" : "d-none"
                            }`}
                        >
                            {dbError.start ? (
                                <ErrorOutlineIcon className="error-icon" />
                            ) : (
                                ""
                            )}
                            {dbError.start}
                        </p>
                    </div>
                    <div className="input-info" style={{ zIndex: "100" }}>
                        <label htmlFor="end" className="form-label">
                            End Date
                        </label>
                        {/* end date controller*/}
                        <Controller
                            control={control}
                            name="end"
                            autocomplete="off"
                            render={({ field }) => (
                                <DatePicker
                                    placeholderText="Select end date"
                                    onChange={(date) => field.onChange(date)}
                                    selected={field.value}
                                    value={field.value}
                                    timeFormat="HH:mm"
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    showTimeSelect
                                    className="form-controll datepicker-lg"
                                    id="end"
                                    autoComplete="off"
                                />
                            )}
                        />
                        <p
                            className={`error-text ${
                                dbError.end ? "" : "d-none"
                            }`}
                        >
                            {dbError.end ? (
                                <ErrorOutlineIcon className="error-icon" />
                            ) : (
                                ""
                            )}
                            {dbError.end}
                        </p>
                    </div>
                    <div className="input-info">
                        <label htmlFor="describe" className="form-label">
                            Event Description{" "}
                            <span className="option">(optional)</span>
                        </label>
                        <input
                            {...register("describe")}
                            type="text"
                            placeholder="Describe your event"
                            className="form-controll"
                            id="describe"
                            aria-describedby="describe"
                        />
                    </div>
                    <button type="submit" className="btn-create">
                        Create
                    </button>
                </form>
            </div>
            {/* </div>
            </div> */}
        </div>
    );
};

function mapStateToProps({ event, error }) {
    return {
        error,
        // event
    };
}

export default connect(mapStateToProps, { addEventApi })(AddEvent);
