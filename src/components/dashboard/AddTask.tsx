import { FormEvent } from "react";
import { Button } from "../ui/button";
import Icon from "../ui/icon";
import { Textarea } from "../ui/textarea";
import useTask from "@/redux/hooks/task";

const AddTask = () => {
  const { add_task } = useTask();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const content = form.get("content") as string;
    add_task({
      content,
      favorite: false,
      status: "TO_DO",
    });
    e.currentTarget.reset();
  };
  return (
    <form
      className="w-full bg-gradient-to-b from-[#D0FFD2]/10 to-[#357937]/10 p-2"
      onSubmit={handleSubmit}
    >
      <Textarea
        name="content"
        className="mb-3 border-none resize-none bg-transparent"
        placeholder="Add A Task"
        required
      />
      <div className="flex justify-between items-center">
        {/* icons */}
        <div className="flex gap-5 items-center">
          <Icon name="bell" />
          <Icon name="repeat" />
          <Icon name="calendar" />
        </div>
        <Button variant="btn" type="submit">
          Add Task
        </Button>
      </div>
    </form>
  );
};

export default AddTask;
