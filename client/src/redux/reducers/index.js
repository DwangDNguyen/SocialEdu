import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import EventReducer from "./eventReducer";
import EventsReducer from "./eventsReducer";
import modalReducer from "./modalReducer";
import userReducer from "./userSlice.js";
import commentReducer from "./commentReducer";
import videoReducer from "./videoSlice.js";
import socketReducer from "./socketSlice.js";

const rootReducer = combineReducers({
    event: EventReducer,
    events: EventsReducer,
    modalStatus: modalReducer,
    error: errorReducer,
    user: userReducer,
    comment: commentReducer,
    video: videoReducer,
    socket: socketReducer,
});

export default rootReducer;
