import { useTheme } from "../theme-provider";
import { Button } from "../ui/button";
import Icon from "../ui/icon";

const ThemeButton = () => {
  const { setTheme, theme } = useTheme();
  if (!theme) return;
  const themeName = theme === "dark" ? "light" : "dark";
  return (
    <Button variant={"ghost"} size={"icon"} onClick={() => setTheme(themeName)}>
      <Icon name={themeName} />
    </Button>
  );
};

export default ThemeButton;
