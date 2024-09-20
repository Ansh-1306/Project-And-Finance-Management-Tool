import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: user ? user : null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
};

// Login async thunk
export const login = createAsyncThunk(
    "auth/login",
    async (userData, thunkApi) => {
        try {
            return await authService.login(userData);  // Call login from authService
        } catch (error) {
            let message = error.response?.data?.detail || error.message || error.toString();
            console.log(error);
            return thunkApi.rejectWithValue(message);
        }
    }
);

// Logout async thunk
export const logout = createAsyncThunk(
    "auth/logout",
    async () => {
        authService.logout();  // Call logout from authService to remove user from localStorage
    }
);

// Create slice for authentication
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;  // Store logged-in user
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;  // Store error message if login fails
                state.user = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;  // Clear user data on logout
            });
    }
});

export const { reset } = authSlice.actions;  // Export the reset action

export default authSlice.reducer;  // Export the reducer
