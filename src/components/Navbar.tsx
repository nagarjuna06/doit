import { Button } from "./ui/button";
import Icon from "./ui/icon";
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
        <div className="flex gap-3 items-center">
          <Icon name="logo" color="#3F9142" size={30} />
          <h3 className="text-primary font-bold text-2xl">DoIt</h3>
        </div>
      </div>
      <div className="flex gap-8 items-center">
        <Icon name="search" />
        <Icon name="grid" />
        <Icon name="dark" />
      </div>
    </nav>
  );
};

export default Navbar;
