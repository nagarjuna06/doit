import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            id: "9e9975e0-0de0-5975-ace7-aad7a8ce99f2",
            username: "Arjun",
            image: "/profile.png",
          });
        }, 1000);
      });
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
