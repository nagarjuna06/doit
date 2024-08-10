import { Button } from "./ui/button";
import Icon from "./ui/icon";
import LayoutButton from "./dashboard/LayoutButton";
import ThemeButton from "./dashboard/ThemeButton";
import Logo from "./Logo";
type Props = {
  menuClick: () => void;
};
const Navbar = ({ menuClick }: Props) => {
  return (
    <nav className="p-4 flex justify-between sticky top-0 z-10 bg-background">
      <div className="flex gap-5 items-center">
        <Button size="icon" variant="ghost" onClick={menuClick}>
          <Icon name="menu" size={25} />
        </Button>
        <Logo />
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
