import AddTask from "@/components/dashboard/AddTask";
import TaskItem from "@/components/dashboard/TaskItem";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import useTask from "@/redux/hooks/task";

const TodayTasks = () => {
  const { layout, todoTasks, completedTasks } = useTask();
  return (
    <div>
      <div className="border-b-2 mb-4 flex gap-2 items-center">
        <p>To Do</p>
        <Icon name="down-arrow" size={10} />
      </div>
      <AddTask />
      {/* todoTasks container */}
      <div
        className={cn("flex items-center mb-5 flex-wrap", {
          "gap-7": layout === "grid",
        })}
      >
        {todoTasks.map((task) => (
          <TaskItem {...task} key={task.id} layout={layout} />
        ))}
      </div>
      {/* completedTasks container */}
      <p>Completed</p>
      <div>
        {completedTasks.map((task) => (
          <TaskItem {...task} key={task.id} />
        ))}
      </div>
    </div>
  );
};

export default TodayTasks;
