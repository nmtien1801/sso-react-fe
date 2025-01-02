import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  check_ssoToken,
  doGetAccountService,
  logoutUserService,
} from "../service/authService";
import { useNavigate } from "react-router-dom";

const initialState = {
  userInfo: {},
  isLoggedIn: false, // Kiểm tra xem người dùng đã đăng nhập chưa
};

export const verify_ssoToken = createAsyncThunk(
  "auth/verify_ssoToken",
  async (ssoToken, thunkAPI) => {
    const response = await check_ssoToken(ssoToken);
    return response;
  }
);

export const doGetAccount = createAsyncThunk(
  "auth/doGetAccount",
  async (thunkAPI) => {
    const response = await doGetAccountService();
    return response;
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (thunkAPI) => {
    const response = await logoutUserService();
    return response;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,

  extraReducers: (builder) => {
    // verify_ssoToken
    builder
      .addCase(verify_ssoToken.pending, (state) => {})
      .addCase(verify_ssoToken.fulfilled, (state, action) => {
        if (action.payload.EC === 0) {
          state.userInfo = action.payload.DT || {};
          state.isLoggedIn = true;
          localStorage.setItem("access_Token", action.payload.DT.access_Token);
          localStorage.setItem(
            "refresh_Token",
            action.payload.DT.refresh_Token
          );
        } else {
          state.isLoggedIn = false;
        }
      })
      .addCase(verify_ssoToken.rejected, (state, action) => {});

    // doGetAccount
    builder
      .addCase(doGetAccount.pending, (state) => {})
      .addCase(doGetAccount.fulfilled, (state, action) => {
        if (action.payload.EC === 0) {
          state.userInfo = action.payload.DT || {};
          state.isLoggedIn = true;
        }
      })
      .addCase(doGetAccount.rejected, (state, action) => {});

    // logoutUser
    builder
      .addCase(logoutUser.pending, (state) => {})
      .addCase(logoutUser.fulfilled, (state, action) => {
        if (action.payload.EC === 0) {
          state.userInfo = {};
          state.isLoggedIn = false;
          localStorage.removeItem("access_Token");
          localStorage.removeItem("refresh_Token");
        }
      })
      .addCase(logoutUser.rejected, (state, action) => {});
  },
});

// Export actions
export const {} = authSlice.actions;

// Export reducer
export default authSlice.reducer;
