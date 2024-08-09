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
  id,
  status,
  content,
  favorite,
  layout = "list",
}: TaskProps & { layout?: string }) => {
  const { update_task_status, update_favorite } = useTask();
  const checked = status == "COMPLETED";

  // if layout is grid layout
  if (layout == "grid") {
    return (
      <div className="flex justify-between items-center p-3 border rounded-md py-12 w-full max-w-[330px]">
        <div className="flex items-center gap-6 ">
          <Checkbox checked={checked} onClick={() => update_task_status(id)} />
          <p
            className={cn("line-clamp-2", {
              "line-through": checked,
            })}
          >
            {content}
          </p>
        </div>
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => update_favorite(id)}
        >
          {favorite ? <Icon name="star-fill" /> : <Icon name="star" />}
        </Button>
      </div>
    );
  }

  // list layout
  return (
    <div className="flex justify-between items-center p-3 py-5 flex-grow w-full border-t-2">
      <div className="flex items-center gap-6 ">
        <Checkbox checked={checked} onClick={() => update_task_status(id)} />
        <p
          className={cn(
            { "line-through": checked },
            "break-words line-clamp-2"
          )}
        >
          {content}
        </p>
      </div>
      <Button
        variant={"ghost"}
        size={"icon"}
        onClick={() => update_favorite(id)}
      >
        {favorite ? <Icon name="star-fill" /> : <Icon name="star" />}
      </Button>
    </div>
  );
};

export default TaskItem;
