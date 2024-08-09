import { TaskProps } from "@/components/dashboard/TaskItem";
import { createSlice } from "@reduxjs/toolkit";

type StateTypes = {
  tasks: TaskProps[];
  loading: boolean;
  layout: "grid" | "list";
  menuOpen: boolean;
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

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    getTasks: (state) => {
      const tasks = JSON.parse(localStorage.getItem("tasks") ?? "[]");
      if (tasks) {
        state.tasks = tasks;
      }
      state.layout =
        (localStorage.getItem("layout") as StateTypes["layout"]) ?? "list";
    },
    updateTasksToLocalStorage: (state) => {
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
      localStorage.setItem("layout", state.layout);
    },

    addTask: (state, { payload }) => {
      state.tasks.unshift({
        id: crypto.randomUUID(),
        ...payload,
      });
    },
    updateTask: (state, { payload }) => {
      const index = state.tasks.findIndex((task) => task.id === payload.id);
      if (index !== -1) {
        state.tasks[index] = payload;
      }
    },

    updateTaskStatus: (state, { payload }) => {
      const index = state.tasks.findIndex((task) => task.id === payload.id);
      if (index !== -1) {
        const status =
          state.tasks[index].status === "COMPLETED" ? "TO_DO" : "COMPLETED";
        state.tasks[index].status = status;
      }
    },
    updateFavorite: (state, { payload }) => {
      const index = state.tasks.findIndex((task) => task.id == payload.id);
      if (index !== -1) {
        state.tasks[index].favorite = !state.tasks[index].favorite;
      }
    },
    updateLayout: (state) => {
      state.layout = state.layout === "grid" ? "list" : "grid";
    },
    updateMenuOpen: (state) => {
      state.menuOpen = !state.menuOpen;
    },
  },
});

export const {
  addTask,
  getTasks,
  updateTask,
  updateTaskStatus,
  updateFavorite,
  updateLayout,
  updateMenuOpen,
  updateTasksToLocalStorage,
} = taskSlice.actions;

export default taskSlice.reducer;
