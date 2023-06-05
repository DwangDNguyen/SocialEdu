import React, { useEffect } from "react";
import "./myCalendar.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Popping from "../../components/Popping/Popping";
import { dateFnsLocalizer, momentLocalizer } from "react-big-calendar";
import { Calendar } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { connect, useSelector } from "react-redux";
import { showEventApi, ShowEventsApi } from "../../redux/actions/eventsAction";
import { closeEvent } from "../../redux/actions/modalAction";
import enUS from "date-fns/locale/en-US";
import { useTranslation } from "react-i18next";
const locales = {
    "en-US": enUS,
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});
const MyCalendar = ({
    title,
    event,
    events,
    showEventApi,
    closeEvent,
    ShowEventsApi,
}) => {
    const [open, setOpen] = useState(false);
    const [renderStatus, rerender] = useState(false);
    const currentUser = useSelector((state) => state.user.user);
    const { t } = useTranslation("calendar");
    // console.log(currentUser);
    useEffect(() => {
        ShowEventsApi(currentUser._id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        // console.log(events);
        console.log("i renderd because of refresh or start");
    }, []);
    useEffect(() => {
        ShowEventsApi(currentUser._id);
        console.log("i rendered");
        // console.log(events);
    }, [renderStatus]);

    const openEventClick = (event) => {
        setOpen(true);
        if (event.id) {
            showEventApi(event.id);
        }

        return;
    };
    const closeEventClick = () => {
        setOpen(false);
        setTimeout(() => closeEvent(), 300);
    };
    return (
        <div className="calendar">
            {/* <Sidebar />
            <div className="calendar-container">
                <Navbar />
                <div className="calendar-content"> */}
            <div className="top">
                <h1 className="new-title">{t("create event." + title)}</h1>
                <Link to="/event/add">
                    <div className="btn-new">
                        {t("create event.New")} <AddIcon className="icon-new" />
                    </div>
                </Link>
            </div>

            <div className="bottom">
                <Popping
                    open={open}
                    handleOpen={openEventClick}
                    handleClose={closeEventClick}
                    renderStatus={renderStatus}
                    rerender={rerender}
                />
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    onSelectEvent={openEventClick}
                />
            </div>

            {/* </div>
            </div> */}
        </div>
    );
};
function mapStateToProps({ event, events }) {
    return {
        event,
        events,
    };
}
export default connect(mapStateToProps, {
    showEventApi,
    closeEvent,
    ShowEventsApi,
})(MyCalendar);
