import react from "react";
const ThemeButton = ({ themeName, changeTheme }) => {
  switch (themeName) {
    case "light":
      return (
        <button
          type="button"
          onClick={() => changeTheme("dark")}
          className="themeButton light"
        >
          Dark
        </button>
      );
    case "dark":
      return (
        <button
          type="button"
          onClick={() => changeTheme("light")}
          className="themeButton dark"
        >
          Light
        </button>
      );
    default:
      return null;
  }
};
export default ThemeButton;
