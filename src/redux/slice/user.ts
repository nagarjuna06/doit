import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type User = {
  id: string;
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

export const getUser = createAsyncThunk("get-user", async () => {
  return new Promise<User>((resolve) => {
    setTimeout(() => {
      resolve({
        id: "9e9975e0-0de0-5975-ace7-aad7a8ce99f2",
        username: "Arjun",
        image: "/profile.png",
      });
    }, 1000);
  });
});

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
  },
});

export default userSlice.reducer;
