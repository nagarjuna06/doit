import useSession from "@/redux/hooks/user";
import Icon, { IconProps } from "./ui/icon";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type MenuItem = {
  icon: IconProps["name"];
  title: string;
  href: string;
};
const menuList: MenuItem[] = [
  {
    icon: "paste",
    title: "All Tasks",
    href: "",
  },
  {
    icon: "calendar",
    title: "Today",
    href: "",
  },
  {
    icon: "star",
    title: "Important",
    href: "",
  },
  {
    icon: "plan",
    title: "Planned",
    href: "",
  },
  {
    icon: "assign",
    title: "Assigned to me",
    href: "",
  },
];

const Sidebar = () => {
  const { user, loading, error, pathname } = useSession();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="w-[280px] bg-[#EEF6EF] mt-20 h-full pb-10">
      {/* profile */}
      <div className="flex flex-col items-center gap-3 relative bottom-10">
        <img
          src={user?.image}
          alt={user?.username}
          className="h-24 w-24 shadow-md rounded-full bg-background"
        />

        <h3>Hey,{user?.username}</h3>
      </div>
      {/* menu */}
      <div className="bg-background mx-8 py-10">
        {menuList.map((each, i) => (
          <Link
            to={each.href}
            key={i}
            className={cn("flex items-center gap-5  p-3 px-5", {
              "bg-secondary rounded-xl text-primary": pathname === each.href,
            })}
          >
            <Icon
              name={each.icon}
              color={pathname === each.href ? "#357937" : "#000"}
            />
            <p>{each.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
