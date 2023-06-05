// import "bootstrap/dist/css/bootstrap.min.css";
import "./updateEvent.scss";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
    ShowEventsApi,
    updateEventApi,
} from "../../redux/actions/eventsAction";
import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { set } from "date-fns";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useTranslation } from "react-i18next";

//schema to validate event inputs
const schema = yup
    .object({
        title: yup.string().required("Can't Be Empty"),
        start: yup.date().required("Please specify the time to start"),
        end: yup
            .date("must be a valid date")
            .required("on update you must specify an end date"),
    })
    .required();
const UpdateEvent = ({ updateEventApi, event, error }) => {
    const navigate = useNavigate();
    const [rerender, setRerender] = useState(false);
    const [dbError, setError] = useState(false);
    const [firstRender, setFirstRender] = useState(true);
    const currentUser = useSelector((state) => state.user.user);
    const { t } = useTranslation("calendar");
    useEffect(() => {
        console.log(error);
        if (error && !firstRender) {
            setError(error);
        }
        if (!error.start && !error.end && dbError !== false) {
            setTimeout(navigate(`/calendar/${currentUser._id}`));
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
        defaultValues: {
            title: event.title,
            start: new Date(event.start),
            end: event.end ? new Date(event.end) : "",
            describe: event.describe
                ? event.describe
                : "No description was provided",
        },
    });

    const onSubmit = async (values) => {
        setFirstRender(false);
        updateEventApi(values, event.id).then((res) => {
            console.log(res);
            setRerender(!rerender);
            if (res === "response was successful") {
                navigate(`/calendar/${currentUser._id}`);
            }
        });
    };

    return (
        <div className="update-event">
            {/* <Sidebar />
            <div className="update-event-container">
                <Navbar />
                <div className="update-event-content"> */}
            <div className="top">
                <h1 className="update-event-title">
                    {t("update event.Update Event")}
                </h1>
            </div>
            <div className="bottom">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="form-update-event"
                >
                    <div className="input-info">
                        <label htmlFor="title" className="form-label">
                            {t("create event.Event Title")}
                        </label>
                        <input
                            {...register("title")}
                            type="text"
                            placeholder={t("create event.Title")}
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
                            {t("create event.Start Date")}
                        </label>
                        {/* controllers are the way you can wrap and use datePicker inside react form-hook*/}
                        {/* start date controller*/}
                        <Controller
                            control={control}
                            name="start"
                            render={({ field }) => (
                                <DatePicker
                                    placeholderText={t(
                                        "create event.Select Date"
                                    )}
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
                            {t("create event.End Date")}
                        </label>
                        {/* end date controller*/}
                        <Controller
                            control={control}
                            name="end"
                            autocomplete="off"
                            render={({ field }) => (
                                <DatePicker
                                    placeholderText={t(
                                        "create event.Select End Date"
                                    )}
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
                            {t("create event.Event Description")}{" "}
                            <span className="option">
                                ({t("create event.Optional")})
                            </span>
                        </label>
                        <input
                            {...register("describe")}
                            type="text"
                            placeholder={t("create event.Describe your event")}
                            className="form-controll"
                            id="describe"
                            aria-describedby="describe"
                        />
                    </div>
                    <button type="submit" className="btn-create">
                        {t("update event.Update")}
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
        event,
    };
}

export default connect(mapStateToProps, { updateEventApi, ShowEventsApi })(
    UpdateEvent
);
