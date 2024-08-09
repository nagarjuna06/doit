import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type User = {
  id: number;
  username: string;
  image: string;
};

type StateProps = {
  user?: User;
  loading: boolean;
  error: string;
};

const initialState: StateProps = {
  user: undefined,
  loading: true,
  error: "",
};

export const getUser = createAsyncThunk(
  "get-user",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("https://dummyjson.com/users/10");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(getUser.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    build.addCase(getUser.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.loading = false;
    });
    build.addCase(getUser.rejected, (state) => {
      state.loading = false;
      state.error = "Failed to load User Data";
    });
  },
});

export default userSlice.reducer;
