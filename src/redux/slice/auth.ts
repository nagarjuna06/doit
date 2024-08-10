import { credentials } from "@/lib/utils";
import { LoginProps } from "@/pages/login";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

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

type CustomResponse = {
  msg: string;
};

const initialState: StateProps = {
  user: undefined,
  loading: true,
  error: "",
};

export const getSession = createAsyncThunk("get-user", async () => {
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

export const loginUser = createAsyncThunk(
  "login",
  async (body: LoginProps, { rejectWithValue }) => {
    try {
      const response = await new Promise<CustomResponse>((resolve, reject) => {
        setTimeout(() => {
          if (
            body.email === credentials.email &&
            body.password === credentials.password
          ) {
            localStorage.setItem("__token", crypto.randomUUID());
            resolve({
              msg: "Login Success",
            });
          } else {
            reject({ msg: "Invalid credentials" });
          }
        }, 1000);
      });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: () => {
      localStorage.removeItem("__token");
    },
  },
  extraReducers: (build) => {
    build.addCase(loginUser.pending, (state) => {
      toast.loading("Logging...", {
        id: "login",
      });
      state.loading = true;
      state.error = "";
    });
    build.addCase(loginUser.fulfilled, (state, { payload }) => {
      toast.success(payload.msg, {
        id: "login",
      });
      state.loading = false;
    });
    build.addCase(loginUser.rejected, (state) => {
      toast.error("Invalid credentials", {
        id: "login",
      });
      state.loading = false;
      state.error = "Invalid credentials";
    });
    build.addCase(getSession.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    build.addCase(getSession.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.loading = false;
    });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
