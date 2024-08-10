import { useCallback, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from ".";
import {
  createTask,
  editTask,
  getDataFromLocalStorage,
  saveDataToLocalStorage,
  setMenuOpen,
} from "../slice/task";
import { TaskProps } from "@/components/dashboard/TaskItem";

const useTask = () => {
  const state = useAppSelector((s) => s.task);
  const dispatch = useAppDispatch();

  //add new task
  const newTask = (payload: Omit<TaskProps, "id">) =>
    dispatch(createTask(payload));

  // edit the task
  const updateTask = (payload: TaskProps) => dispatch(editTask(payload));

  // filter tasks based on status (TO_DO, COMPLETED)
  const filteredTasks = useMemo(() => {
    const todoTasks = state.tasks.filter((task) => task.status === "TO_DO");
    const completedTasks = state.tasks.filter(
      (task) => task.status === "COMPLETED"
    );
    return { todoTasks, completedTasks };
  }, [state.tasks]);

  const setMenu = () => dispatch(setMenuOpen());
  return {
    newTask,
    updateTask,
    setMenu,
    ...state,
    ...filteredTasks,
  };
};

export default useTask;

export const useAutoSave = () => {
  const dispatch = useAppDispatch();

  const handleSave = useCallback(() => {
    dispatch(saveDataToLocalStorage());
  }, [dispatch]);

  useEffect(() => {
    // get the tasks from the local storage
    dispatch(getDataFromLocalStorage());
    window.addEventListener("beforeunload", () => handleSave);
    window.addEventListener("unload", handleSave);

    return () => {
      window.removeEventListener("beforeunload", handleSave);
      window.removeEventListener("unload", handleSave);
    };
  }, [dispatch, handleSave]);
  return null;
};
