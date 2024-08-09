import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./pages/dashboard";
import AllTasks from "./pages/dashboard/AllTasks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard/all-tasks" />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "all-tasks",
        element: <AllTasks />,
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
