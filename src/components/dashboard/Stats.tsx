import useTask from "@/redux/hooks/task";
import {
  Chart as ChartJS,
  CategoryScale,
  Tooltip,
  ArcElement,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Icon from "../ui/icon";
import { useTheme } from "../theme-provider";

ChartJS.register(CategoryScale, Tooltip, ArcElement, Legend);

const options: ChartOptions<"doughnut"> = {
  responsive: true,
  resizeDelay: 100,
  borderColor: "transparent",
  plugins: {
    legend: {
      display: true,
      position: "bottom",
      align: "start",
      labels: {
        usePointStyle: true,
        boxHeight: 6,
        boxWidth: 6,
      },
    },
  },
  rotation: -90,
  cutout: 50,
};

const Stats = () => {
  const { theme } = useTheme();
  const { tasks, todoTasks, completedTasks } = useTask();
  const data: ChartData<"doughnut"> = {
    labels: ["Pending", "Done"],
    datasets: [
      {
        label: "Task Stats",
        data: [todoTasks.length, completedTasks.length],
        backgroundColor:
          theme == "dark" ? ["#3F9142", "#A0EDA3"] : ["#3F9142", "#142E15"],
      },
    ],
  };
  return (
    <div className="bg-background m-5 p-5">
      <div className="flex justify-between mb-8">
        <div>
          <p>Today Tasks</p>
          <p className="text-xl font-medium">{tasks.length}</p>
        </div>
        <Icon name="info" className="text-background" />
      </div>
      <Doughnut options={options} data={data} />
    </div>
  );
};

export default Stats;
