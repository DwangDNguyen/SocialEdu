const initialValue = {
    id: "",
    start: "",
    end: "",
    describe: "",
    userId: "",
};

const EventReducer = (state, action) => {
    state = initialValue;
    switch (action.type) {
        case "SHOW_EVENT":
            return action.payload;

        case "DELETE_EVENT":
            return initialValue;

        case "CLOSE_EVENT":
            return initialValue;

        default:
            return state;
    }
};

export default EventReducer;
