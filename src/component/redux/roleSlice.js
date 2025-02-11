import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createNewPath_service,
  getAllPath_service,
  deletePath_service,
  getRole_service ,
  getPathByRoleId_service,
  authenticateRole_service,
} from "../service/roleService";
import { useNavigate } from "react-router-dom";

const initialState = {
  paths: [],
  roles: [],
  pathWithRole: [],
};

export const getAllPath = createAsyncThunk(
  "role/getAllPath",
  async ( thunkAPI) => {
    const response = await getAllPath_service();
    return response;
  }
);

export const createNewPath = createAsyncThunk(
  "role/createNewPath",
  async (pathData, thunkAPI) => {
    const response = await createNewPath_service(pathData);
    return response;
  }
);

export const deletePath = createAsyncThunk(
  "role/deletePath",
  async ( pathId, thunkAPI) => {
    const response = await deletePath_service(pathId);
    return response;
  }
);

export const getRole = createAsyncThunk(
  "role/getRole",
  async (  thunkAPI) => {
    const response = await getRole_service();
    return response;
  }
);

export const getPathByRoleId = createAsyncThunk(
  "role/getPathByRoleId",
  async ( roleId, thunkAPI) => {
    const response = await getPathByRoleId_service(roleId);
    return response;
  }
);

export const authenticateRole = createAsyncThunk(
  "role/authenticateRole",
  async (data, thunkAPI) => {
    const response = await authenticateRole_service(data);
    return response;
  }
);

const roleSlice = createSlice({
  name: "role",
  initialState,

  extraReducers: (builder) => {
    // getAllPath
    builder
      .addCase(getAllPath.pending, (state) => {})
      .addCase(getAllPath.fulfilled, (state, action) => {
        state.paths = action.payload.DT;
      })
      .addCase(getAllPath.rejected, (state, action) => {});

    // createNewPath
    builder
      .addCase(createNewPath.pending, (state) => {})
      .addCase(createNewPath.fulfilled, (state, action) => {})
      .addCase(createNewPath.rejected, (state, action) => {});

    // deletePath
    builder
      .addCase(deletePath.pending, (state) => {})
      .addCase(deletePath.fulfilled, (state, action) => {})
      .addCase(deletePath.rejected, (state, action) => {});
    
    // getRole
    builder
      .addCase(getRole.pending, (state) => {})
      .addCase(getRole.fulfilled, (state, action) => {
        state.roles = action.payload.DT;
      })
      .addCase(getRole.rejected, (state, action) => {});

    // getPathByRoleId
    builder
      .addCase(getPathByRoleId.pending, (state) => {})
      .addCase(getPathByRoleId.fulfilled, (state, action) => {
        state.pathWithRole = action.payload.DT;
      })
      .addCase(getPathByRoleId.rejected, (state, action) => {});

    // authenticateRole
    builder
      .addCase(authenticateRole.pending, (state) => {})
      .addCase(authenticateRole.fulfilled, (state, action) => {})
      .addCase(authenticateRole.rejected, (state, action) => {});
  },
});

// Export actions
export const {} = roleSlice.actions;

// Export reducer
export default roleSlice.reducer;
