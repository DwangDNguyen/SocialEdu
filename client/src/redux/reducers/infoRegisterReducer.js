import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    info: null,
};

export const infoRegisterSlice = createSlice({
    name: "info",
    initialState,
    reducers: {
        updateInfo: (state, action) => {
            state.info = action.payload;
        },
    },
});

export const { updateInfo } = infoRegisterSlice.actions;
export default infoRegisterSlice.reducer;
