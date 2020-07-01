const themeReducer = (state, action) => {
  switch (action.type) {
    case "change":
      window.localStorage.setItem("theme", action.theme);
      return { ...state, themeName: action.theme };
    default:
      return state;
  }
};
export default themeReducer;
