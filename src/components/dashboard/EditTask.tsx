import { Button } from "../ui/button";
import Icon, { IconProps } from "../ui/icon";
import TaskItem, { TaskProps } from "./TaskItem";

type Props = {
  task: TaskProps;
  onClick: () => void;
};
type FeatureType = {
  icon: IconProps["name"];
  title: string;
};
const features: FeatureType[] = [
  {
    icon: "plus",
    title: "Add Step",
  },
  {
    icon: "bell",
    title: "Set Reminder",
  },
  {
    icon: "calendar",
    title: "Add Due Date",
  },
  {
    icon: "repeat",
    title: "Report",
  },
];

const EditTask = ({ task, onClick }: Props) => {
  return (
    <div className="w-full max-w-[350px] bg-[#EEF6EF] pt-6 p-2 flex flex-col justify-between  pl-5 dark:bg-[#2C2C2C]">
      <div>
        <TaskItem {...task} />

        {features.map((each, i) => (
          <div key={i} className="flex gap-5 p-5 border-t-2">
            <Icon name={each.icon} />
            <p>{each.title}</p>
          </div>
        ))}
        <div className="border-t-2 p-5">Add Notes</div>
      </div>
      <div className="flex justify-between items-center border-t-2 p-5">
        <Button variant={"ghost"} size={"icon"} onClick={onClick}>
          <Icon name="close" />
        </Button>
        <p>Created Today</p>
        <Button variant={"ghost"} size={"icon"}>
          <Icon name="trash" />
        </Button>
      </div>
    </div>
  );
};

export default EditTask;
