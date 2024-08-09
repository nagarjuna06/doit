import { Button } from "../ui/button";
import Icon from "../ui/icon";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateLayout } from "@/redux/slice/task";

const LayoutButton = () => {
  const { layout } = useAppSelector((s) => s.task);
  const dispatch = useAppDispatch();
  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      onClick={() => dispatch(updateLayout())}
    >
      <Icon name={layout == "grid" ? "list" : "grid"} />
    </Button>
  );
};

export default LayoutButton;
