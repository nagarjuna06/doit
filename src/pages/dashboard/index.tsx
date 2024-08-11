import AuthProvider from "@/components/auth-provider";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import useTask, { useAutoSave } from "@/redux/hooks/task";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  useAutoSave();
  const { setMenu, menuOpen } = useTask();

  return (
    <AuthProvider>
      <div className="font-outfit">
        <Navbar menuClick={setMenu} />
        <div className="flex">
          {menuOpen && <Sidebar />}
          <div className="flex-grow">
            <Outlet />
          </div>
        </div>
      </div>
    </AuthProvider>
  );
};

export default Dashboard;
