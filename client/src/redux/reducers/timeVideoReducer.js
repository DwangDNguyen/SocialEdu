import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    currentTimeVideo: {
        id: "",
        time: 0,
    },
    timeVideo: [],
};

export const timeVideoSlice = createSlice({
    name: "timeVideo",
    initialState: initialValue,
    reducers: {
        addTimeVideo: (state, action) => {
            state.currentTimeVideo = action.payload;
            const index = state.timeVideo.findIndex(
                (time) => time.id === action.payload.id
            );

            if (index !== -1) {
                state.timeVideo[index] = action.payload;
            } else {
                state.timeVideo.push(action.payload);
            }
        },
        updateTimeVideo: (state, action) => {
            state.timeVideo = state.timeVideo.map((time) => {
                if (time.id === action.payload.id) {
                    return action.payload;
                }
                return time;
            });
        },
        resetTimeVideo: (state) => {
            state.timeVideo = [];
        },
    },
});

export const { addTimeVideo, updateTimeVideo, resetTimeVideo } =
    timeVideoSlice.actions;
export default timeVideoSlice.reducer;
