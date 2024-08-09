import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import useTask, { useAutoSave } from "@/redux/hooks/task";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  useAutoSave();
  const { update_menu_open, menuOpen } = useTask();

  return (
    <div className="font-outfit">
      <Navbar menuClick={update_menu_open} />
      <div className="px-12 flex gap-x-12">
        {menuOpen && <Sidebar />}
        <div className="flex-grow-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
