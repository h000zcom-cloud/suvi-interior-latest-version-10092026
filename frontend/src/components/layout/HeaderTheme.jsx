import { createContext, useContext, useMemo, useState } from "react";

const HeaderThemeContext = createContext({ theme: "dark", setTheme: () => {} });

export const HeaderThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  return <HeaderThemeContext.Provider value={value}>{children}</HeaderThemeContext.Provider>;
};

export const useHeaderTheme = () => useContext(HeaderThemeContext);
