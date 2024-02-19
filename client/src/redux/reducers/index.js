import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import EventReducer from "./eventReducer";
import EventsReducer from "./eventsReducer";
import modalReducer from "./modalReducer";
import userReducer from "./userSlice.js";
import commentReducer from "./commentReducer";
import videoReducer from "./videoSlice.js";
import socketReducer from "./socketSlice.js";
import infoRegisterReducer from "./infoRegisterReducer.js";
import timeVideoReducer from "./timeVideoReducer.js";

const rootReducer = combineReducers({
    event: EventReducer,
    events: EventsReducer,
    modalStatus: modalReducer,
    error: errorReducer,
    user: userReducer,
    comment: commentReducer,
    video: videoReducer,
    socket: socketReducer,
    infoRegister: infoRegisterReducer,
    timeVideo: timeVideoReducer,
});

export default rootReducer;
