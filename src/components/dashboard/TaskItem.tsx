import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import Icon from "../ui/icon";
import useTask from "@/redux/hooks/task";
import { cn } from "@/lib/utils";

export type TaskProps = {
  id: string;
  content: string;
  favorite: boolean;
  status: "TO_DO" | "COMPLETED";
};

const TaskItem = ({
  layout = "list",
  onClick = () => {},
  ...task
}: TaskProps & { layout?: string; onClick?: (task: TaskProps) => void }) => {
  const { updateTask } = useTask();
  const checked = task.status == "COMPLETED";
  const status = task.status == "COMPLETED" ? "TO_DO" : "COMPLETED";

  const handleUpdateTaskStatus = () => {
    updateTask({ ...task, status });
  };

  const handleUpdateTaskFavorite = () => {
    updateTask({ ...task, favorite: !task.favorite });
  };

  // list layout
  return (
    <div
      className={cn(
        "flex justify-between items-center p-3 py-5 flex-grow w-full border-t-2 ",
        {
          "border rounded-md py-12 max-w-[330px]": layout === "grid",
        }
      )}
    >
      <div className="flex items-center gap-6">
        <Checkbox checked={checked} onClick={handleUpdateTaskStatus} />
        <p
          onClick={() => onClick(task)}
          className={cn(
            { "line-through": checked },
            "break-words line-clamp-1 cursor-pointer"
          )}
        >
          {task.content}
        </p>
      </div>
      <Button
        variant={"ghost"}
        size={"icon"}
        onClick={handleUpdateTaskFavorite}
      >
        {task.favorite ? <Icon name="star-fill" /> : <Icon name="star" />}
      </Button>
    </div>
  );
};

export default TaskItem;
