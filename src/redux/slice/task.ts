import { TaskProps } from "@/components/dashboard/TaskItem";
import { delay } from "@/lib/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

type StateTypes = {
  tasks: TaskProps[];
  loading: boolean;
  layout: "grid" | "list";
  menuOpen: boolean;
  task?: TaskProps;
};

const initialState: StateTypes = {
  tasks: [
    {
      id: "ca8ed708-c12e-5b48-9db4-b4d6d2e95ff2",
      content: "Buy groceries",
      favorite: false,
      status: "TO_DO",
    },
  ],
  loading: false,
  layout: "list",
  menuOpen: true,
};

export const getDataFromLocalStorage = createAsyncThunk(
  "get-data",
  async () => {
    return new Promise<{ tasks: TaskProps[]; layout: string }>((resolve) => {
      setTimeout(() => {
        const tasks = JSON.parse(localStorage.getItem("tasks") ?? "[]");
        const layout = localStorage.getItem("layout") ?? "list";
        resolve({ tasks, layout });
      }, delay);
    });
  }
);
export const createTask = createAsyncThunk(
  "createTask",
  async (body: Omit<TaskProps, "id">) => {
    return new Promise<TaskProps>((resolve) => {
      setTimeout(() => {
        resolve({ id: crypto.randomUUID(), ...body });
      }, delay);
    });
  }
);

export const editTask = createAsyncThunk("editTask", async (body: object) => {
  return new Promise<TaskProps>((resolve) => {
    setTimeout(() => {
      resolve(body as TaskProps);
    }, delay);
  });
});

export const deleteTask = createAsyncThunk("deleteTask", async (id: string) => {
  return new Promise<{ id: string }>((resolve) => {
    setTimeout(() => {
      resolve({ id });
    }, delay);
  });
});

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    updateTask: (state, { payload }) => {
      const index = state.tasks.findIndex((task) => task.id === payload.id);
      if (index !== -1) {
        state.tasks[index] = payload;
      }
    },
    saveDataToLocalStorage: (state) => {
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
      localStorage.setItem("layout", state.layout);
    },
    updateLayout: (state) => {
      state.layout = state.layout === "grid" ? "list" : "grid";
    },
    setMenuOpen: (state) => {
      state.menuOpen = !state.menuOpen;
    },
    setTask: (state, { payload }) => {
      state.task = payload;
    },
  },
  extraReducers: (builder) => {
    //get data from localStorage pending
    builder.addCase(getDataFromLocalStorage.pending, (state) => {
      state.loading = true;
    });

    // get data from localStorage fulfilled
    builder.addCase(getDataFromLocalStorage.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.tasks = payload.tasks;
      state.layout = payload.layout as StateTypes["layout"];
    });

    // create task pending
    builder.addCase(createTask.pending, () => {
      toast.loading("Creating Task", {
        id: "create-task",
      });
    });
    // create task fulfilled
    builder.addCase(createTask.fulfilled, (state, { payload }) => {
      toast.success("Task Created", {
        id: "create-task",
      });
      state.tasks.unshift(payload);
    });

    // edit task pending
    builder.addCase(editTask.pending, () => {
      toast.loading("Updating Task", {
        id: "edit-task",
      });
    });

    // edit task fulfilled
    builder.addCase(editTask.fulfilled, (state, { payload }) => {
      toast.success("Task Updated", {
        id: "edit-task",
      });
      const index = state.tasks.findIndex((task) => task.id === payload.id);
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...payload };
      }
    });
    // delete task pending
    builder.addCase(deleteTask.pending, () => {
      toast.loading("deleting Task", {
        id: "delete-task",
      });
    });
    // delete task fulfilled
    builder.addCase(deleteTask.fulfilled, (state, { payload }) => {
      toast.success("Task Deleted", {
        id: "delete-task",
      });
      const index = state.tasks.findIndex((task) => task.id === payload.id);
      if (index !== -1) {
        state.tasks.splice(index, 1);
        state.task = undefined;
      }
    });
  },
});

export const { setMenuOpen, updateLayout, saveDataToLocalStorage, setTask } =
  taskSlice.actions;

export default taskSlice.reducer;
