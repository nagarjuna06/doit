import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import useTask, { useAutoSave } from "@/redux/hooks/task";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  useAutoSave();
  const { setMenu, menuOpen } = useTask();

  return (
    <div className="font-outfit">
      <Navbar menuClick={setMenu} />
      <div className="flex">
        {menuOpen && <Sidebar />}
        <div className="flex-grow-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
