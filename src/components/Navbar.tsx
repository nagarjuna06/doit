import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import Icon from "./ui/icon";
import LayoutButton from "./dashboard/LayoutButton";
import ThemeButton from "./dashboard/ThemeButton";
type Props = {
  menuClick: () => void;
};
const Navbar = ({ menuClick }: Props) => {
  return (
    <nav className="p-4 flex justify-between ">
      <div className="flex gap-5 items-center">
        <Button size="icon" variant="ghost" onClick={menuClick}>
          <Icon name="menu" size={25} />
        </Button>
        <Link to={"/"} className="flex gap-3 items-center text-primary">
          <Icon name="logo" size={30} />
          <h3 className="font-bold text-2xl">DoIt</h3>
        </Link>
      </div>
      <div className="flex gap-5 items-center">
        <Icon name="search" />
        <LayoutButton />
        <ThemeButton />
      </div>
    </nav>
  );
};

export default Navbar;
