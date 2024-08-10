import useAuth from "@/redux/hooks/auth";
import Icon, { IconProps } from "./ui/icon";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import Stats from "./dashboard/Stats";
import { Button } from "./ui/button";

type MenuItem = {
  icon: IconProps["name"];
  title: string;
  href: string;
};
const menuList: MenuItem[] = [
  {
    icon: "paste",
    title: "All Tasks",
    href: "all-tasks",
  },
  {
    icon: "calendar",
    title: "Today",
    href: "today",
  },
  {
    icon: "star",
    title: "Important",
    href: "important",
  },
  {
    icon: "plan",
    title: "Planned",
    href: "planned",
  },
  {
    icon: "assign",
    title: "Assigned to me",
    href: "assigned-to-me",
  },
];

const Sidebar = () => {
  const { user, loading, error, pathname, logout } = useAuth();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="w-[280px] bg-[#EEF6EF] dark:bg-[#2C2C2C] mt-32 h-full relative ml-12">
      {/* profile */}
      <div className="flex flex-col items-center gap-3 absolute w-full -top-16">
        <img
          src={user?.image}
          alt={user?.username}
          className="h-32 w-32 shadow-lg rounded-full bg-background"
        />

        <h3>Hey,{user?.username}</h3>
        <Button variant={"btn"} onClick={logout}>
          Logout
        </Button>
      </div>

      {/* menu */}
      <div className="bg-background py-10 w-[240px] m-5 mt-40">
        {menuList.map((each, i) => (
          <Link
            to={each.href}
            key={i}
            className={cn("flex items-center gap-5  p-2 px-5", {
              "bg-gray-200 dark:bg-[#357937] rounded-xl text-primary dark:text-[#98E19B] font-medium":
                pathname.includes(each.href),
            })}
          >
            <Icon name={each.icon} />
            <p>{each.title}</p>
          </Link>
        ))}
      </div>
      {/* add list */}
      <div className="m-5 p-8 bg-background">
        <div className="flex items-center gap-3">
          <Icon name="plus" />
          <p>Add list</p>
        </div>
      </div>
      {/* stats */}
      <Stats />
    </div>
  );
};

export default Sidebar;
