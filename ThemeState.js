import React, { useReducer, useEffect, useState } from "react";
import ThemeContext from "./ThemeContext";
import ThemeReducer from "./ThemeReducer";
import Loader from "./components/Loader";
const ThemeState = ({ children }) => {
  const [loading, setLoading] = useState(true);
  let initalTheme = {
    themeName: "light",
  };

  const [state, dispatch] = useReducer(ThemeReducer, initalTheme);
  useEffect(() => {
    if (localStorage.getItem("theme") !== null) {
      dispatch({ type: "change", theme: localStorage.getItem("theme") });
    }
    setLoading(false);
  }, []);
  const changeTheme = (passedTheme) => {
    dispatch({
      type: "change",
      theme: passedTheme,
    });
  };
  return (
    <ThemeContext.Provider
      value={{
        theme: state,
        changeTheme,
      }}
    >
      {loading ? <Loader /> : children}
    </ThemeContext.Provider>
  );
};

export default ThemeState;
