import useTask from "@/redux/hooks/task";
import {
  Chart as ChartJS,
  CategoryScale,
  Tooltip,
  Title,
  ArcElement,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(CategoryScale, Tooltip, Title, ArcElement);

const Stats = () => {
  const { todoTasks, completedTasks } = useTask();

  return (
    <div className="p-3 bg-background">
      <Pie
        options={{
          responsive: true,
        }}
        data={{
          datasets: [
            {
              label: "Tasks",
              data: [todoTasks.length, completedTasks.length],
              backgroundColor: ["#3F9142", "#142E15"],
            },
          ],
        }}
      />
    </div>
  );
};

export default Stats;
