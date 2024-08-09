import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

import { useState } from "react";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <div>
      <Navbar menuClick={() => setOpen(!open)} />
      <div className="px-16">
        {open && <Sidebar />}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
