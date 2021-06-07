import { useContext } from "react";
import { TailwindThemeContext } from "../providers/TailwindThemeProvider";

const useTheme = () => {
  return useContext(TailwindThemeContext);
};

export default useTheme;
