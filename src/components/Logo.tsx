import { Link } from "react-router-dom";
import Icon from "./ui/icon";

const Logo = () => {
  return (
    <Link to={"/"} className="flex gap-3 items-center text-primary">
      <Icon name="logo" size={30} />
      <h3 className="font-bold text-2xl">DoIt</h3>
    </Link>
  );
};

export default Logo;
