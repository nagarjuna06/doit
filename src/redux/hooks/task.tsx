import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from ".";
import {
  getTasks,
  addTask,
  updateTask,
  updateTaskStatus,
  updateFavorite,
  updateMenuOpen,
  updateTasksToLocalStorage,
} from "../slice/task";
import { TaskProps } from "@/components/dashboard/TaskItem";

const useTask = () => {
  const state = useAppSelector((s) => s.task);
  const dispatch = useAppDispatch();

  //add new task
  const add_task = (payload: Omit<TaskProps, "id">) =>
    dispatch(addTask(payload));

  // edit the task
  const update_task = (payload: TaskProps) => dispatch(updateTask(payload));
  // update the task status
  const update_task_status = (id: string) => dispatch(updateTaskStatus({ id }));
  // update the favorite status of the task
  const update_favorite = (id: string) => dispatch(updateFavorite({ id }));
  // update the menu open status
  const update_menu_open = () => dispatch(updateMenuOpen());

  // filter tasks based on status (TO_DO, COMPLETED)
  const filteredTasks = useMemo(() => {
    const todoTasks = state.tasks.filter((task) => task.status === "TO_DO");
    const completedTasks = state.tasks.filter(
      (task) => task.status === "COMPLETED"
    );
    return { todoTasks, completedTasks };
  }, [state.tasks]);

  return {
    add_task,
    update_task,
    update_task_status,
    update_favorite,
    update_menu_open,
    ...state,
    ...filteredTasks,
  };
};

export default useTask;

export const useAutoSave = () => {
  const dispatch = useAppDispatch();
  const handleSave = () => dispatch(updateTasksToLocalStorage());
  useEffect(() => {
    // get the tasks from the local storage
    dispatch(getTasks());
    window.addEventListener("beforeunload", () => handleSave);
    window.addEventListener("unload", handleSave);
    return () => {
      window.removeEventListener("beforeunload", handleSave);
      window.removeEventListener("unload", handleSave);
    };
  }, [dispatch]);
  return null;
};
