import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user: null,
    loading: false,
    error: false,
    isAdmin: false,
    token: null,
    refresh: 0,
};
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.token = action.payload.token;
        },
        loginFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        logout: (state) => {
            state.user.token = null;
            state.user = null;
            state.token = null;
            state.isAdmin = false;
            state.loading = false;
            state.error = false;
            state.refresh = 0;
        },
        updateSuccess: (state, action) => {
            state.user = action.payload;
        },
        refreshChat: (state, action) => {
            state.refresh += 1;
        },
        subscription: (state, action) => {
            if (state.user.subscribedUsers.includes(action.payload)) {
                state.user.subscribedUsers.splice(
                    state.user.subscribedUsers.findIndex(
                        (channelId) => channelId === action.payload
                    ),
                    1
                );
            } else {
                state.user.subscribedUsers.push(action.payload);
            }
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    updateSuccess,
    refreshChat,
    subscription,
} = userSlice.actions;

export default userSlice.reducer;
