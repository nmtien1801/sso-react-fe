import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  check_ssoToken,
  doGetAccountService,
  logoutUserService,
} from "../service/authService";
import { useNavigate } from "react-router-dom";

const initialState = {
  user_Info: {},
  isLogin: false, // Kiểm tra xem người dùng đã đăng nhập chưa
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
    // login user
    builder
      .addCase(verify_ssoToken.pending, (state) => {})
      .addCase(verify_ssoToken.fulfilled, (state, action) => {
        if (action.payload.EC === 0) {
          state.user_Info = action.payload.DT || {};
          state.isLogin = true;
        } else {
          state.isLogin = false;
        }
      })
      .addCase(verify_ssoToken.rejected, (state, action) => {});

    // doGetAccount
    builder
      .addCase(doGetAccount.pending, (state) => {})
      .addCase(doGetAccount.fulfilled, (state, action) => {
        state.user_Info = action.payload.DT || {};
      })
      .addCase(doGetAccount.rejected, (state, action) => {});

    // logoutUser
    builder
      .addCase(logoutUser.pending, (state) => {})
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.user_Info = {};
        state.isLogin = false;
        console.log("action.payload.EC: ", action.payload);

        // if (action.payload.EC === 0)
        //   window.location.href = `${process.env.REACT_APP_BACKEND_SSO_LOGIN}/login?serviceURL=${process.env.REACT_APP_SERVICE_URL}`;
      })
      .addCase(logoutUser.rejected, (state, action) => {});
  },
});

// Export actions
export const {} = authSlice.actions;

// Export reducer
export default authSlice.reducer;
