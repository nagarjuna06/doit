import AddTask from "@/components/dashboard/AddTask";
import EditTask from "@/components/dashboard/EditTask";
import TaskItem, { TaskProps } from "@/components/dashboard/TaskItem";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import useTask from "@/redux/hooks/task";
import { useState } from "react";

const TodayTasks = () => {
  const [task, setTask] = useState<TaskProps>();
  const { layout, todoTasks, completedTasks, loading } = useTask();
  if (loading) return <p>Loading...</p>;
  return (
    <div
      className={cn("flex", {
        "px-12": !task,
      })}
    >
      {/* tasks */}
      <div className="flex-grow h-[134vh] overflow-y-auto">
        <div className="border-b-2 mb-4 flex gap-2 items-center">
          <p>To Do</p>
          <Icon name="down-arrow" size={10} />
        </div>
        <AddTask />
        {/* todoTasks container */}
        <div
          className={cn(
            "flex items-center justify-center mb-5 flex-wrap px-1",
            {
              "gap-6": layout === "grid",
            }
          )}
        >
          {todoTasks.map((task) => (
            <TaskItem
              {...task}
              key={task.id}
              layout={layout}
              onClick={(task) => setTask(task)}
            />
          ))}
        </div>
        {/* completedTasks container */}
        <p>Completed</p>
        <div>
          {completedTasks.map((task) => (
            <TaskItem
              {...task}
              key={task.id}
              onClick={(task) => setTask(task)}
            />
          ))}
        </div>
      </div>
      {/* task edit */}
      {task && <EditTask task={task} onClick={() => setTask(undefined)} />}
    </div>
  );
};

export default TodayTasks;
