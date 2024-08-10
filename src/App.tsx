import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./pages/dashboard";
import AllTasks from "./pages/dashboard/AllTasks";
import TodayTasks from "./pages/dashboard/TodayTasks";
import ImportantTasks from "./pages/dashboard/ImportantTasks";
import PlannedTasks from "./pages/dashboard/PlannedTasks";
import AssignedTasks from "./pages/dashboard/AssignedTasks";
import Login from "./pages/login";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Navigate to="/dashboard/today" />,
  },

  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <Navigate to="today" />,
      },
      {
        path: "all-tasks",
        element: <AllTasks />,
      },
      {
        path: "today",
        element: <TodayTasks />,
      },
      {
        path: "important",
        element: <ImportantTasks />,
      },
      {
        path: "planned",
        element: <PlannedTasks />,
      },
      {
        path: "assigned-to-me",
        element: <AssignedTasks />,
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
