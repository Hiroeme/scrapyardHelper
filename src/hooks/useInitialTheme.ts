import { useEffect } from 'react';

const useInitialTheme = (theme: string, setTheme : React.Dispatch<React.SetStateAction<string>>) => {
    useEffect(() => {
    const initialTheme = localStorage.getItem("theme");
    if (initialTheme === "dark" || initialTheme === "light") {
      setTheme(initialTheme);
       document.documentElement.setAttribute("data-theme", initialTheme);
    } else {
      document.documentElement.setAttribute("data-theme", theme)
    }
  }, []);
}

export default useInitialTheme;