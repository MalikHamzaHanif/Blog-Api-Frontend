import { createSlice } from "@reduxjs/toolkit"


const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        status: false
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload.userData
            state.status = true;
        },
        logout: (state) => {
            state.status = false;
            state.user = null
        },
    }
});

export const { login, logout } = authSlice.actions

export default authSlice.reducer