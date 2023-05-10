import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    socket: {},
};

export const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        setSocket: (state, action) => {
            return action.payload;
        },
        disconnect: (state) => {
            state.socket = null;
        },
    },
});

export const { setSocket } = socketSlice.actions;
export default socketSlice.reducer;
